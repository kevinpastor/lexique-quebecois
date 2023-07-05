import { Collection, Db, Document, ObjectId } from "mongodb";

import { defaultAggregateOptions, getDatabase } from "@app/api/database";
import { WordDocument } from "@models/word-document";

interface HighlightText {
    value: string;
    type: "hit" | "text";
}

interface HighlightDocument {
    path: string;
    texts: Array<HighlightText>;
    score: number;
}

interface OutputDocument {
    _id: ObjectId;
    highlight: HighlightDocument;
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
        }
    ];

    return collection.aggregate<OutputDocument>(pipeline, defaultAggregateOptions)
        .map(({ highlight: { texts: [{ value: spelling }] } }: OutputDocument): string => (spelling))
        .toArray();
};
