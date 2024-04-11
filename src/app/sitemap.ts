import { type Collection, type Db, type Document } from "mongodb";
import { type MetadataRoute } from "next";

import { defaultAggregateOptions, getDatabase } from "~/services/database";
import { getSlug } from "~/types/definition";
import { type WordDocument } from "~/types/word-document";

import { host } from "./robots";

interface OutputDocument {
    spellings: string;
    timestamp: Date;
}

interface WordInformation {
    spelling: string;
    timestamp: Date;
}

const getWordsInformation = async (): Promise<Array<WordInformation>> => {
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
                _id: false,
                spellings: true,
                timestamp: {
                    $reduce: {
                        input: {
                            $map: {
                                input: "$definitions",
                                as: "definition",
                                in: {
                                    $convert: {
                                        input: "$$definition._id",
                                        to: "date"
                                    }
                                }
                            }
                        },
                        initialValue: 0,
                        in: {
                            $cond: [
                                {
                                    $gte: [
                                        "$$this",
                                        "$$value"
                                    ]
                                },
                                "$$this",
                                "$$value"
                            ]
                        }
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
        .map(({ spellings: spelling, timestamp }: OutputDocument): WordInformation => ({
            spelling,
            timestamp
        }))
        .toArray();
};

const getWordsPath = async (): Promise<MetadataRoute.Sitemap> => {
    const wordsInformation: Array<WordInformation> = await getWordsInformation();

    return wordsInformation.map(({ spelling, timestamp }: WordInformation) => ({
        url: `${host}/mots/${getSlug(spelling)}`,
        lastModified: timestamp
    }));
};

const generateSitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const wordsPath = await getWordsPath();

    return [
        {
            url: host
        },
        {
            url: `${host}/conditions`
        },
        {
            url: `${host}/confidentialite`
        },
        {
            url: `${host}/contact`
        },
        {
            url: `${host}/contribuer`
        },
        {
            url: `${host}/contenu`
        },
        {
            url: `${host}/mots`
        },
        ...wordsPath
    ];
};

export default generateSitemap;
