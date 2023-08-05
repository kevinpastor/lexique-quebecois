import { type Collection, type Db, type Document } from "mongodb";

import { defaultAggregateOptions, getDatabase } from "~/services/database";
import { type WordDocument } from "~/types/word-document";

interface OutputDocument {
    spellings: string;
}

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
