// @ts-check
const { MongoClient } = require("mongodb");

// Taken from @utils/misc/string.ts
const removeAccents = (input) => (
    input.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
);

// Taken from @models/word-request.ts
const getSlug = (label) => {
    const spacelessLabel = label.replace(/\s/g, "-");
    return removeAccents(spacelessLabel)
        .toLocaleLowerCase();
};

const getWordsPath = async (config = {}) => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is missing in environment variables.");
    }

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
    }
    catch (error) {
        throw new Error(`Could not connect to database. \n${error}`);
    }

    const database = client.db("quebecoisUrbain");
    const collection = database.collection("spellings");

    const pipeline = [
        {
            $lookup: {
                from: "words",
                localField: "wordId",
                foreignField: "_id",
                as: "fromWords"
            }
        },
        {
            $match: {
                fromWords: {
                    $elemMatch: {
                        definitions: {
                            $elemMatch: {
                                isApproved: true
                            }
                        }
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                label: "$spelling",
                timestamp: {
                    $reduce: {
                        input: {
                            $map: {
                                input: {
                                    $getField: {
                                        input: {
                                            $arrayElemAt: [
                                                "$fromWords",
                                                0
                                            ]
                                        },
                                        field: "definitions"
                                    }
                                },
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
        }
    ];
    const words = await collection.aggregate(pipeline)
        .toArray();

    const wordsPath = words.map(({ label, timestamp }) => ({
        loc: `/mots/${getSlug(label)}`,
        changefreq: "monthly",
        priority: config.priority ?? 0.7,
        lastmod: timestamp.toISOString(),
    }));

    await client.close();

    return wordsPath;
};

/** @type {import("next-sitemap").IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || "https://lexiquequebecois.com",
    generateRobotsTxt: true,
    transform: async (config, path) => {
        if (path === "/") {
            return {
                loc: path,
                changefreq: "always",
                priority: "1.0" // Dirty fix to keep the decimal
            };
        }

        if (path === "/mots") {
            return {
                loc: path,
                changefreq: "weekly",
                priority: 0.5
            };
        }

        if (path === "/conditions" || path === "/confidentialite") {
            return {
                loc: path,
                changefreq: "monthly",
                priority: 0.4
            };
        }

        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined
        };
    },
    additionalPaths: async (config) => {
        const paths = [];

        try {
            const wordsPath = await getWordsPath(config);
            paths.push(...wordsPath);
        }
        catch (error) {
            console.error("Unable to add words path.");
            console.error(error);
        }

        return paths;
    }
};
