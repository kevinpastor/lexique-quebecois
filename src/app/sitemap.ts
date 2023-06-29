import { Collection, Db, Document } from "mongodb";
import { MetadataRoute } from "next";

import { defaultAggregateOptions, getDatabase } from "@app/api/database";
import { getSlug } from "@models/definition";
import { WordDocument } from "@models/word-document";

import { host } from "./robots";

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
                },
                timestamp: {
                    $reduce: {
                        input: {
                            $map: {
                                input: "$definitions",
                                as: "definition",
                                "in": {
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
            $unwind: "$spelling"
        },
        {
            $sort: {
                spelling: 1
            }
        }
    ];

    return collection.aggregate<WordInformation>(pipeline, defaultAggregateOptions)
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
            url: `${host}`
        },
        {
            url: `${host}/ajouter`
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
            url: `${host}/contenu`
        },
        {
            url: `${host}/mots`
        },
        ...wordsPath
    ];
};

export default generateSitemap;
