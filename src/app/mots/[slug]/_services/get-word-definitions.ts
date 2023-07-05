import { Collection, Db, Document } from "mongodb";

import { Word } from "~types/word";
import { WordDocument } from "~types/word-document";
import { defaultAggregateOptions, getDatabase } from "@services/database";
import { ratingOperator } from "@utils/api/aggregation/rating-operator";
import { safeInOperator } from "@utils/api/aggregation/safe-in-operator";
import { safeSizeOperator } from "@utils/api/aggregation/safe-size-operator";
import { timestampOperator } from "@utils/api/aggregation/timestamp-operator";

export const getWordDefinitions = async (spelling: string, ip: string = ""): Promise<Word | null> => {
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
                                ),
                                likes: safeSizeOperator("$$definition.reactions.likes"),
                                isLiked: safeInOperator("$$definition.reactions.likes", ip),
                                dislikes: safeSizeOperator("$$definition.reactions.dislikes"),
                                isDisliked: safeInOperator("$$definition.reactions.dislikes", ip)
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

    return collection.aggregate<Word>(pipeline, defaultAggregateOptions)
        .next();
};
