import { type Collection, type Db, type Document } from "mongodb";

import { defaultAggregateOptions, getDatabase } from "~/services/database";
import { type WordDocument } from "~/types/word-document";

interface OutputDocument {
    spelling: string;
}

export const getAutocompletedWords = async (query: string): Promise<Array<string>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");

    const pipeline: Array<Document> = [
        {
            $search: {
                autocomplete: {
                    path: "spellings",
                    query
                },
                highlight: {
                    path: "spellings"
                }
            }
        },
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
                highlight: {
                    $meta: "searchHighlights"
                }
            }
        },
        {
            $unwind: "$highlight"
        },
        {
            $sort: {
                "highlight.score": -1
            }
        },
        {
            $project: {
                spelling: {
                    $getField: {
                        field: "value",
                        input: {
                            $first: "$highlight.texts"
                        }
                    }
                }
            }
        }
    ];

    return await collection.aggregate<OutputDocument>(pipeline, defaultAggregateOptions)
        .map(({ spelling }: OutputDocument): string => (spelling))
        .toArray();
};
