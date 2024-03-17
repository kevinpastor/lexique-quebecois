import { type Collection, type Db, type Document } from "mongodb";
import { cache } from "react";

import { defaultAggregateOptions, getDatabase } from "~/services/database";
import { type WordDocument } from "~/types/word-document";

interface OutputDocument {
    spellings: string;
}

const getWordIndexImplementation = async (): Promise<Array<string>> => {
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
            $unwind: "$spellings"
        },
        {
            $sort: {
                spellings: 1
            }
        }
    ];

    return await collection.aggregate<OutputDocument>(pipeline, defaultAggregateOptions)
        .map(({ spellings }: OutputDocument): string => (spellings))
        .toArray();
};

export const getWordIndex = cache(getWordIndexImplementation);
