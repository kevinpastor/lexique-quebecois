import { type Collection, type Db, type Document } from "mongodb";
import { cache } from "react";

import { defaultAggregateOptions, getDatabase } from "~/services/database";
import { type Word } from "~/types/word";
import { type WordDocument } from "~/types/word-document";
import { ratingOperator } from "~/utils/api/aggregation/rating-operator";
import { safeSizeOperator } from "~/utils/api/aggregation/safe-size-operator";
import { timestampOperator } from "~/utils/api/aggregation/timestamp-operator";

const getWordDefinitions = async (spelling: string): Promise<Word | null> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");
    const pipeline: Array<Document> = [
        {
            $search: {
                text: {
                    path: "spellings",
                    query: spelling
                }
            }
        },
        {
            $limit: 1
        },
        {
            $project: {
                spellings: true,
                definitions: {
                    $map: {
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
                            timestamp: timestampOperator("$$definition._id"),
                            reactions: {
                                rating: ratingOperator(
                                    safeSizeOperator("$$definition.reactions.likes"),
                                    safeSizeOperator("$$definition.reactions.dislikes")
                                )
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
                "definitions.reactions.rating": -1
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
            $unset: [
                "_id",
                "definitions.reactions.rating"
            ]
        }
    ];

    return await collection.aggregate<Word>(pipeline, defaultAggregateOptions)
        .next();
};

export const cachedGetWordDefinitions = cache(getWordDefinitions);
