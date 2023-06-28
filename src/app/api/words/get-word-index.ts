import { Collection, Db, Document } from "mongodb";

import { defaultAggregateOptions, getDatabase } from "@app/api/database";
import { WordDocument } from "@models/word-document";

// TODO Move closer to usage.
export const getWordIndex = async (): Promise<Array<string>> => {
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
                _id: 0,
                spelling: {
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
                }
            }
        },
        {
            $unwind: "$spelling"
        },
        {
            $sort: {
                spelling: 1
            }
        }
    ];
    return collection.aggregate<{ spelling: string }>(pipeline, defaultAggregateOptions)
        .map(({ spelling }: { spelling: string }): string => (spelling))
        .toArray();
};
