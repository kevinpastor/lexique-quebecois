import { Collection, Db, Document } from "mongodb";

import { defaultAggregateOptions, getDatabase } from "@app/api/database";
import { Word } from "@models/word";
import { WordDocument } from "@models/word-document";
import { countArrayOperation } from "@utils/api/aggregation/operations/count-array-operation";
import { inArrayOperation } from "@utils/api/aggregation/operations/in-array-operation";
import { timestampOperation } from "@utils/api/aggregation/operations/timestamp-operation";
import { getRatingExpression } from "@utils/api/aggregation/stages/review-sort-stages";

const createSearchStage = (query: string, fields: Array<string | Document>): Document => {
    const operators: Array<Document> = fields.map((field: string | Document): Document => ({
        text: {
            path: field,
            query
        }
    }));

    return {
        $search: {
            compound: {
                should: operators
            }
        }
    };
};

// TODO Move closer to usage.
export const getWordDefinitions = async (spelling: string, ip: string = ""): Promise<Word | null> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");

    const pipeline: Array<Document> = [
        createSearchStage(
            spelling,
            [
                "spelling",
                "spellingAlt",
                "spellingAlt2",
                "spellingAlt3",
                "spellingAlt4"
            ]
        ),
        {
            $limit: 1
        },
        {
            $project: {
                spellings: {
                    $filter: {
                        input: [
                            "$spelling",
                            "$spellingAlt",
                            "$spellingAlt2",
                            "$spellingAlt3",
                            "$spellingAlt4"
                        ],
                        as: "value",
                        cond: {
                            $not: {
                                $eq: [
                                    "$$value",
                                    null
                                ]
                            }
                        }
                    }
                },
                definitions: {
                    $map: {
                        input: {
                            $filter: {
                                input: "$definitions",
                                as: "definition",
                                cond: {
                                    $eq: ["$$definition.isApproved", true]
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
                                rating: getRatingExpression(
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
                "definitions.reactions.rating": -1,
                "definitions.timestamp": -1,
                "definitions.label": 1
            }
        },
        {
            $group: {
                _id: "$_id",
                spellings: {
                    $first: "$spellings"
                },
                definitions: {
                    $push: "$definitions"
                }
            }
        },
        {
            $unset: "definitions.reactions.rating"
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
        },
        {
            $unset: "_id"
        }
    ];

    return collection.aggregate<Word>(pipeline, defaultAggregateOptions)
        .next();
};
