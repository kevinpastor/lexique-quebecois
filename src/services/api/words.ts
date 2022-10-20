import { Collection, Db, InsertOneResult, WithId, ObjectId, Document, Filter, UpdateFilter, UpdateResult, AggregateOptions } from "mongodb";

import { Definition } from "@models/definition";
import { DefinitionDocument } from "@models/definition-document";
import { SpellingDocument } from "@models/spelling-document";
import { Status } from "@models/status";
import { Word } from "@models/word";
import { WordDocument } from "@models/word-document";
import { WordRequest } from "@models/word-request";
import { countArrayOperation } from "@utils/api/aggregation/operations/count-array-operation";
import { inArrayOperation } from "@utils/api/aggregation/operations/in-array-operation";
import { timestampOperation } from "@utils/api/aggregation/operations/timestamp-operation";
import { getReviewScore } from "@utils/api/aggregation/stages/review-sort-stages";
import { sample } from "@utils/misc/random";

import { getDatabase } from "./database";

const definitionProjectionOperation = (ip: string): Document => ({
    _id: 0,
    id: {
        $toString: "$_id"
    },
    label: 1,
    wordClasses: "$classes",
    definition: 1,
    example: 1,
    author: {
        name: "$author.name"
    },
    timestamp: timestampOperation("$_id"),
    reactions: {
        likes: countArrayOperation("$reactions.likes"),
        isLiked: inArrayOperation("$reactions.likes", ip),
        dislikes: countArrayOperation("$reactions.dislikes"),
        isDisliked: inArrayOperation("$reactions.dislikes", ip)
    }
});

const definitionProjectionStage = (ip: string): Document => ({
    $project: definitionProjectionOperation(ip)
});

const defaultAggregateOptions: AggregateOptions = {
    collation: {
        locale: "fr_CA"
    }
};

export const getWordIndex = async (): Promise<Array<string>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("spellings");
    const pipeline: Array<Document> = [
        {
            $lookup: {
                from: "words",
                localField: "wordId",
                foreignField: "_id",
                as: "fromWords"
            }
        },
        {
            $match: {
                fromWords: {
                    $elemMatch: {
                        definitions: {
                            $elemMatch: {
                                isApproved: true
                            }
                        }
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                spelling: 1,
                score: {
                    $meta: "searchScore"
                }
            }
        },
        {
            $sort: {
                score: -1,
                spelling: 1
            }
        }
    ];
    return collection.aggregate<SpellingDocument>(pipeline, defaultAggregateOptions)
        .map(({ spelling }: SpellingDocument): string => (spelling))
        .toArray();
};

const getDefinitionDocumentsId = async (): Promise<Array<ObjectId>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");
    const pipeline: Array<Document> = [
        {
            $match: {
                definitions: {
                    $elemMatch: {
                        isApproved: true
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
        }
    ];

    return collection.aggregate<WithId<DefinitionDocument>>(pipeline, defaultAggregateOptions)
        .map(({ _id }: WithId<DefinitionDocument>): ObjectId => (_id))
        .toArray();
};

// ! TODO Make sure that definitions are unique
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
        definitionProjectionStage(ip)
    ];

    return collection.aggregate<Definition>(pipeline, defaultAggregateOptions)
        .toArray();
};

export const getWordDefinitions = async (spelling: string, ip: string = ""): Promise<Word | undefined> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("spellings");
    const pipeline: Array<Document> = [
        {
            $search: {
                index: "default",
                text: {
                    query: spelling,
                    path: "spelling"
                }
            }
        },
        {
            $group: {
                _id: "$wordId",
                wordId: {
                    $first: "$wordId"
                }
            }
        },
        {
            $lookup: {
                from: "spellings",
                localField: "wordId",
                foreignField: "wordId",
                as: "spellings"
            }
        },
        {
            $project: {
                _id: 0,
                spellings: "$spellings.spelling",
                wordId: 1
            }
        },
        {
            $lookup: {
                from: "words",
                localField: "wordId",
                foreignField: "_id",
                as: "fromWords"
            }
        },
        {
            $project: {
                spellings: 1,
                definitions: {
                    $map: {
                        input: {
                            $filter: {
                                input: {
                                    $arrayElemAt: [
                                        "$fromWords.definitions", 0
                                    ]
                                },
                                as: "definition",
                                cond: {
                                    $eq: [
                                        "$$definition.isApproved", true
                                    ]
                                }
                            }
                        },
                        as: "definition",
                        in: {
                            id: {
                                $toString: "$$definition._id"
                            },
                            label: "$$definition.label",
                            wordClasses: "$$definition.classes",
                            definition: "$$definition.definition",
                            example: "$$definition.example",
                            author: {
                                name: "$$definition.author.name"
                            },
                            timestamp: timestampOperation("$$definition._id"),
                            reactions: {
                                score: getReviewScore(
                                    countArrayOperation("$$definition.reactions.likes"),
                                    countArrayOperation("$$definition.reactions.dislikes")
                                ),
                                likes: countArrayOperation("$$definition.reactions.likes"),
                                isLiked: inArrayOperation("$$definition.reactions.likes", ip),
                                dislikes: countArrayOperation("$$definition.reactions.dislikes"),
                                isDisliked: inArrayOperation("$$definition.reactions.dislikes", ip)
                            }
                        }
                    }
                }
            }
        },
        {
            $unwind: "$definitions"
        },
        {
            $sort: {
                "definitions.reactions.score": -1,
                "definitions.timestamp": -1,
                "definitions.label": 1
            }
        },
        {
            $group: {
                _id: "$definitions.id",
                spellings: {
                    $first: "$spellings"
                },
                definitions: {
                    $push: "$definitions"
                }
            }
        },
        {
            $unset: "definitions.reactions.score"
        },
        {
            $unwind: "$spellings"
        },
        {
            $sort: {
                "spellings": 1
            }
        },
        {
            $group: {
                _id: "$_id",
                spellings: {
                    $push: "$spellings"
                },
                definitions: {
                    $first: "$definitions"
                }
            }
        }
    ];

    const word: Word | null = await collection.aggregate<Word>(pipeline, defaultAggregateOptions)
        .next();

    if (!word) {
        return undefined;
    }

    return word;
};

export const addWord = async (wordRequest: WordRequest, ip: string): Promise<Status> => {
    const database: Db = await getDatabase();
    const spellingsCollection: Collection<SpellingDocument> = database.collection("spellings");
    const match: WithId<SpellingDocument> | null = await spellingsCollection.findOne({ spelling: wordRequest.label });

    const wordsCollection: Collection<WordDocument> = database.collection("words");
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
            definitions: [definition]
        };

        const wordResult: InsertOneResult<WithId<WordDocument>> = await wordsCollection.insertOne(word);
        if (!wordResult.acknowledged) {
            return Status.InternalError;
        }

        const spelling: SpellingDocument = {
            spelling: wordRequest.label,
            wordId: wordResult.insertedId
        };

        const spellingResult: InsertOneResult<WithId<SpellingDocument>> = await spellingsCollection.insertOne(spelling);
        if (!spellingResult.acknowledged) {
            return Status.InternalError;
        }

        return Status.Created;
    }

    const filter: Filter<WordDocument> = {
        _id: match.wordId
    };
    const update: UpdateFilter<WordDocument> = {
        $push: {
            definitions: definition
        }
    };
    const result: UpdateResult = await wordsCollection.updateOne(filter, update);

    if (!result.acknowledged || result.modifiedCount !== 1) {
        return Status.InternalError;
    }

    return Status.Created;
};

type WithScore<T> = T & {
    score: number;
};

export const getAutocompletedWords = async (query: string): Promise<Array<string>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("spellings");
    const pipeline: Array<Document> = [
        {
            $search: {
                index: "default",
                autocomplete: {
                    query: query,
                    path: "spelling",
                    fuzzy: {}
                }
            }
        },
        {
            $lookup: {
                from: "words",
                localField: "wordId",
                foreignField: "_id",
                as: "fromWords"
            }
        },
        {
            $match: {
                fromWords: {
                    $elemMatch: {
                        definitions: {
                            $elemMatch: {
                                isApproved: true
                            }
                        }
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                spelling: 1,
                score: {
                    $meta: "searchScore"
                }
            }
        },
        {
            $sort: {
                score: -1,
                spelling: 1
            }
        }
    ];

    const spellings: Array<WithScore<SpellingDocument>> = await collection.aggregate<WithScore<SpellingDocument>>(pipeline, defaultAggregateOptions)
        .toArray();

    return spellings.map(({ spelling }: SpellingDocument): string => (
        spelling
    ));
};
