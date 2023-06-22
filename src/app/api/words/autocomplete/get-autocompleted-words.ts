import { Collection, Db, Document } from "mongodb";

import { WordDocument } from "@models/word-document";
import { defaultAggregateOptions, getDatabase } from "src/app/api/database";

const createAutocompleteSearchWithBitmaskScore = (query: string, fields: Array<string | Document>): Document => {
    const operators: Array<Document> = fields.map((field: string | Document, index: number): Document => ({
        autocomplete: {
            path: field,
            query,
            score: {
                constant: {
                    value: Math.pow(2, index)
                }
            }
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

const getIndexesFromMask = (mask: number): Array<number> => {
    const indexes: Array<number> = [];

    let index = 0;
    while (mask > 0) {
        if (mask & 1) {
            indexes.push(index);
        }

        mask >>= 1;
        index++;
    }

    return indexes;
};

const createBitmaskedArray = (bitmask: string | Document, elements: Array<string | Document>): Document => {
    const size: number = Math.pow(2, elements.length) - 1;

    const branches: Array<Document> = [];
    for (let i = 0; i < size; i++) {
        const indexes: Array<number> = getIndexesFromMask(i + 1);

        const branch: Document = {
            case: {
                $eq: [bitmask, i + 1]
            },
            then: indexes.map((index: number): string | Document => elements[index])
        };

        branches.push(branch);
    }

    return {
        $switch: {
            branches,
            default: []
        }
    };
};

export const getAutocompletedWords = async (query: string): Promise<Array<string>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");

    const pipeline: Array<Document> = [
        createAutocompleteSearchWithBitmaskScore(
            query,
            [
                "spelling",
                "spellingAlt",
                "spellingAlt2",
                "spellingAlt3",
                "spellingAlt4"
            ]
        ),
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
                spelling: createBitmaskedArray(
                    {
                        $meta: "searchScore"
                    },
                    [
                        "$spelling",
                        "$spellingAlt",
                        "$spellingAlt2",
                        "$spellingAlt3",
                        "$spellingAlt4"
                    ]
                )
            }
        },
        {
            $unwind: "$spelling"
        }
    ];

    return collection.aggregate<{ spelling: string }>(pipeline, defaultAggregateOptions)
        .map(({ spelling }: { spelling: string }): string => (spelling))
        .toArray();
};
