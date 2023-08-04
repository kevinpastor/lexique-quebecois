import { Collection, Db, WithId, ObjectId, Document } from "mongodb";

import { defaultAggregateOptions, getDatabase } from "~/services/database";
import { Definition } from "~/types/definition";
import { DefinitionDocument } from "~/types/definition-document";
import { WordDocument } from "~/types/word-document";
import { ratingOperator } from "~/utils/api/aggregation/rating-operator";
import { safeSizeOperator } from "~/utils/api/aggregation/safe-size-operator";
import { timestampOperator } from "~/utils/api/aggregation/timestamp-operator";
import { sample } from "~/utils/misc/random";

const definitionProjectionOperation = (): Document => ({
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
    timestamp: timestampOperator("$_id")
});

const definitionProjectionStage = (): Document => ({
    $project: definitionProjectionOperation()
});

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
            $project: {
                filteredDefinitions: {
                    $filter: {
                        input: "$definitions",
                        as: "definition",
                        cond: {
                            $eq: [
                                "$$definition.isApproved",
                                true
                            ]
                        }
                    }
                }
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $reduce: {
                        input: "$filteredDefinitions",
                        initialValue: { $arrayElemAt: ["$filteredDefinitions", 0] },
                        in: {
                            $cond: {
                                if: {
                                    $gt: [
                                        ratingOperator(
                                            safeSizeOperator("$$value.reactions.likes"),
                                            safeSizeOperator("$$value.reactions.dislikes")
                                        ),
                                        ratingOperator(
                                            safeSizeOperator("$$this.reactions.likes"),
                                            safeSizeOperator("$$this.reactions.dislikes")
                                        )
                                    ]
                                },
                                // Order of `$$value` and `$$this` is important.
                                then: "$$value",
                                else: "$$this"
                            }
                        }
                    }
                }
            }
        }
    ];

    return await collection.aggregate<WithId<DefinitionDocument>>(pipeline, defaultAggregateOptions)
        .map(({ _id }: DefinitionDocument): ObjectId => (_id))
        .toArray();
};

export const getDefinitionsSample = async (): Promise<Array<Definition>> => {
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
        {
            $match: {
                _id: {
                    $in: sampledIds
                }
            }
        },
        definitionProjectionStage()
    ];

    return await collection.aggregate<Definition>(pipeline, defaultAggregateOptions)
        .toArray();
};
