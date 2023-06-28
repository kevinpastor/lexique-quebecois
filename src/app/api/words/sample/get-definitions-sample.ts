import { Collection, Db, WithId, ObjectId, Document } from "mongodb";

import { defaultAggregateOptions, getDatabase } from "@app/api/database";
import { Definition } from "@models/definition";
import { DefinitionDocument } from "@models/definition-document";
import { WordDocument } from "@models/word-document";
import { countArrayOperation } from "@utils/api/aggregation/operations/count-array-operation";
import { inArrayOperation } from "@utils/api/aggregation/operations/in-array-operation";
import { timestampOperation } from "@utils/api/aggregation/operations/timestamp-operation";
import { getReviewScore } from "@utils/api/aggregation/stages/review-sort-stages";
import { sample } from "@utils/misc/random";

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
            $replaceRoot: {
                newRoot: {
                    $reduce: {
                        input: {
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
                        },
                        initialValue: {},
                        in: {
                            $cond: {
                                if: {
                                    $gt: [
                                        getReviewScore(
                                            countArrayOperation("$$value.reactions.likes"),
                                            countArrayOperation("$$value.reactions.dislikes")
                                        ),
                                        getReviewScore(
                                            countArrayOperation("$$this.reactions.likes"),
                                            countArrayOperation("$$this.reactions.dislikes")
                                        )
                                    ]
                                },
                                then: "$$value",
                                else: "$$this"
                            }
                        }
                    }
                }
            }
        }
    ];

    return collection.aggregate<WithId<DefinitionDocument>>(pipeline, defaultAggregateOptions)
        .map(({ _id }: DefinitionDocument): ObjectId => (_id))
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
        {
            $match: {
                _id: {
                    $in: sampledIds
                }
            }
        },
        definitionProjectionStage(ip)
    ];

    return collection.aggregate<Definition>(pipeline, defaultAggregateOptions)
        .toArray();
};