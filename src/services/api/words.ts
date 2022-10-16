import { Collection, Db, InsertOneResult, WithId, ObjectId, Document, Filter, UpdateFilter, UpdateResult } from "mongodb";

import { Definition } from "@models/definition";
import { DefinitionDocument } from "@models/definition-document";
import { Status } from "@models/status";
import { WordDocument } from "@models/word-document";
import { WordRequest } from "@models/word-request";
import { countArrayOperation } from "@utils/api/aggregation/operations/count-array-operation";
import { inArrayOperation } from "@utils/api/aggregation/operations/in-array-operation";
import { timestampOperation } from "@utils/api/aggregation/operations/timestamp-operation";
import { reviewSortStages } from "@utils/api/aggregation/stages/review-sort-stages";
import { sample } from "@utils/misc/random";

import { getDatabase } from "./database";

const approvedDefinitionsStage = (): Document => ({
    $match: {
        definitions: {
            $elemMatch: {
                isApproved: true
            }
        }
    }
});

const definitionProjectionOperation = (ip: string): Document => ({
    _id: 0,
    id: {
        $toString: "$_id"
    },
    label: 1,
    wordClasses: "$classes",
    definition: 1,
    example: 1,
    author: "$author.name",
    timestamp: timestampOperation(),
    likes: countArrayOperation("$reactions.likes"),
    isLiked: inArrayOperation("$reactions.likes", ip),
    dislikes: countArrayOperation("$reactions.dislikes"),
    isDisliked: inArrayOperation("$reactions.dislikes", ip)
});

const definitionProjectionStage = (ip: string): Document => ({
    $project: definitionProjectionOperation(ip)
});

export const getWordIndex = async (): Promise<Array<string>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");
    const pipeline: Array<Document> = [
        approvedDefinitionsStage(),
        {
            $project: {
                _id: 0,
                label: "$spellings"
            }
        },
        {
            $unwind: "$label"
        },
        {
            $sort: {
                label: 1
            }
        }
    ];

    return collection.aggregate<Pick<DefinitionDocument, "label">>(pipeline)
        .map(({ label }: Pick<DefinitionDocument, "label">): string => (label))
        .toArray();
};

const getDefinitionDocumentsId = async (): Promise<Array<ObjectId>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");
    const pipeline: Array<Document> = [
        approvedDefinitionsStage(),
        {
            $unwind: "$definitions"
        },
        {
            $replaceRoot: {
                newRoot: "$definitions"
            }
        }
    ];

    return collection.aggregate<WithId<DefinitionDocument>>(pipeline)
        .map(({ _id }: WithId<DefinitionDocument>): ObjectId => (_id))
        .toArray();
};

export const getDefinitionsSample = async (ip: string = ""): Promise<Array<Definition>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");

    const ids: Array<ObjectId> = await getDefinitionDocumentsId();
    const sampleSize: number = 5;
    const now: Date = new Date();
    const seed: number = Math.floor(now.getTime() / 86400000); // 1000ms * 60s * 60min * 24h
    const sampledIds: Array<ObjectId> = sample(ids, sampleSize, seed);

    const pipeline: Array<Document> = [
        {
            $match: {
                definitions: {
                    $elemMatch: {
                        _id: {
                            $in: sampledIds
                        }
                    }
                }
            }
        },
        {
            $unwind: "$definitions"
        },
        {
            $replaceRoot: {
                newRoot: "$definitions"
            }
        },
        // ...reviewSortStages(
        //     countArrayOperation("$likes"),
        //     countArrayOperation("$dislikes")
        // ),
        definitionProjectionStage(ip)
    ];

    return collection.aggregate<Definition>(pipeline)
        .toArray();
};

export const getWordDefinitions = async (spelling: string, ip: string = ""): Promise<Array<Definition>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");
    const pipeline: Array<Document> = [
        {
            $search: {
                index: "default",
                text: {
                    query: spelling,
                    path: "spellings"
                }
            }
        },
        approvedDefinitionsStage(),
        {
            $unwind: "$definitions"
        },
        {
            $replaceRoot: {
                newRoot: "$definitions"
            }
        },
        ...reviewSortStages(
            countArrayOperation("$likes"),
            countArrayOperation("$dislikes")
        ),
        definitionProjectionStage(ip)
    ];

    return collection.aggregate<Definition>(pipeline)
        .toArray();
};

export const addWord = async (wordRequest: WordRequest, ip: string): Promise<Status> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");
    const match: WithId<WordDocument> | null = await collection.findOne({ spellings: wordRequest.label });

    const definition: WithId<DefinitionDocument> = {
        _id: new ObjectId(),
        label: wordRequest.label,
        definition: wordRequest.definition,
        example: wordRequest.example,
        author: {
            ip,
            ...(wordRequest.author && { name: wordRequest.author })
        },
        classes: wordRequest.wordClasses,
        isApproved: false,
        reactions: {
            likes: [],
            dislikes: []
        }
    };

    if (!match) {
        const word: WordDocument = {
            spellings: [wordRequest.label],
            definitions: [definition]
        };

        const result: InsertOneResult<WithId<WordDocument>> = await collection.insertOne(word);

        if (!result.acknowledged) {
            return Status.InternalError;
        }

        return Status.Created;
    }

    const filter: Filter<WordDocument> = {
        _id: match._id
    };
    const update: UpdateFilter<WordDocument> = {
        $push: {
            definitions: definition
        }
    };
    const result: UpdateResult = await collection.updateOne(filter, update);

    if (!result.acknowledged || result.modifiedCount !== 1) {
        return Status.InternalError;
    }

    return Status.Created;
};

// type WithScore<T> = T & {
//     score: number;
// };

export const getAutocompletedWords = async (query: string): Promise<Array<string>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");
    const pipeline: Array<Document> = [
        {
            $search: { // This operator is only accepted as the first in the pipeline.
                index: "default",
                regex: {
                    query: `${query}(.*)`,
                    path: "spellings",
                    allowAnalyzedField: true
                }
            }
        },
        approvedDefinitionsStage(),
        {
            $project: {
                _id: 0,
                label: "$spellings"
            }
        },
        {
            $unwind: "$label"
        },
        {
            $sort: {
                label: 1
            }
        }
        // {
        //     $addFields: {
        //         score: {
        //             $meta: "searchScore"
        //         }
        //     }
        // },
        // {
        //     $sort: {
        //         score: -1
        //     }
        // }
    ];
    const words: Array<Pick<DefinitionDocument, "label">> = await collection.aggregate<Pick<DefinitionDocument, "label">>(pipeline)
        .toArray();

    return words.map(({ label }: Pick<DefinitionDocument, "label">): string => (
        label
    ));
};
