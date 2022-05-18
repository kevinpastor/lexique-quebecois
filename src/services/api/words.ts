import { Collection, Db, FindOptions, InsertOneResult, WithId, ObjectId, UpdateFilter, UpdateResult, DeleteResult } from "mongodb";

import { Status } from "@models/status";
import { Word } from "@models/word";
import { WordDocument } from "@models/word-document";
import { WordRequest, getSlug } from "@models/word-request";
import { sample } from "@utils/misc/random";
import { InclusiveProjection } from "@utils/types/projection";
import { WithStringId } from "@utils/types/with-string-id";

import { getDatabase } from "./database";

const getWordProjection = (ip: string): InclusiveProjection<WordDocument, Word> => ({
    _id: 0,
    label: 1,
    slug: 1,
    definition: 1,
    example: 1,
    author: 1,
    timestamp: {
        $toDouble: {
            $toDate: "$_id"
        }
    },
    likes: {
        $cond: {
            if: {
                $isArray: "$likes"
            },
            then: {
                $size: "$likes"
            },
            else: 0
        }
    },
    isLiked: {
        $cond: {
            if: {
                $isArray: "$likes"
            },
            then: {
                $in: [
                    ip,
                    "$likes"
                ]
            },
            else: false
        }
    },
    dislikes: {
        $cond: {
            if: {
                $isArray: "$dislikes"
            },
            then: {
                $size: "$dislikes"
            },
            else: 0
        }
    },
    isDisliked: {
        $cond: {
            if: {
                $isArray: "$dislikes"
            },
            then: {
                $in: [
                    ip,
                    "$dislikes"
                ]
            },
            else: false
        }
    }
});

export const getWordIndex = async (ip: string): Promise<Array<string>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const pipeline = [
        {
            $match: {
                isApproved: true
            }
        },
        {
            $sort: {
                slug: 1
            }
        },
        {
            $project: getWordProjection(ip)
        }
    ];
    const words: Array<Word> = await collection.aggregate<Word>(pipeline)
        .toArray();

    return words.map(({ label }: Word): string => (
        label
    ));
};

export const getWordsSample = async (ip: string = ""): Promise<Array<Word>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const idsPipeline = [
        {
            $match: {
                isApproved: true
            }
        },
        {
            $project: {
                _id: 1
            }
        }
    ];
    const ids: Array<ObjectId> = await collection.aggregate<WithId<unknown>>(idsPipeline)
        .map(({ _id }: WithId<unknown>): ObjectId => (_id))
        .toArray();

    const sampleSize: number = 5;
    const now: Date = new Date();
    const seed: number = Math.floor(now.getTime() / 86400000); // 1000ms * 60s * 60min * 24h
    const sampledIds: Array<ObjectId> = sample(ids, sampleSize, seed);

    const wordsPipeline = [
        {
            $match: {
                _id: {
                    $in: sampledIds
                }
            }
        },
        {
            $project: getWordProjection(ip)
        }
    ];
    const words: Array<Word> = await collection.aggregate<Word>(wordsPipeline)
        .toArray();

    return words;
};

export const getWordDocuments = async (): Promise<Array<WithStringId<WordDocument>>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const pipeline = [
        {
            $addFields: {
                _id: {
                    $toString: "$_id"
                }
            }
        }
    ];
    const wordDocuments: Array<WithStringId<WordDocument>> = await collection.aggregate<WithStringId<WordDocument>>(pipeline)
        .toArray();

    return wordDocuments;
};

export const getWordDocument = async (id: string): Promise<WithStringId<WordDocument> | undefined> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const pipeline = [
        {
            $match: {
                _id: new ObjectId(id)
            }
        },
        {
            $addFields: {
                _id: {
                    $toString: "$_id"
                }
            }
        }
    ];
    const wordDocuments: Array<WithStringId<WordDocument>> = await collection.aggregate<WithStringId<WordDocument>>(pipeline)
        .toArray();

    if (wordDocuments.length !== 1) {
        return;
    }

    return wordDocuments[0];
};

export const updateWordDocument = async (wordDocument: WithStringId<WordDocument>): Promise<Status> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const filter: Partial<WithId<WordDocument>> = {
        _id: new ObjectId(wordDocument._id)
    };
    const update: UpdateFilter<WordDocument> = {
        $set: {
            author: wordDocument.author,
            definition: wordDocument.definition,
            example: wordDocument.example,
            isApproved: wordDocument.isApproved,
            label: wordDocument.label,
            slug: wordDocument.slug
        }
    };
    const result: UpdateResult = await collection.updateOne(filter, update);

    if (result.matchedCount === 0) {
        return Status.NotFound;
    }

    if (result.modifiedCount === 0) {
        return Status.Conflict;
    }

    return Status.OK;
};

export const deleteWordDocument = async (id: string): Promise<Status> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const filter: Partial<WithId<WordDocument>> = {
        _id: new ObjectId(id)
    };
    const result: DeleteResult = await collection.deleteOne(filter);

    if (!result.acknowledged || result.deletedCount !== 1) {
        return Status.NotFound;
    }

    return Status.OK;
};

export const getWord = async (slug: string, ip: string): Promise<Word | undefined> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const filter: Partial<WordDocument> = {
        slug,
        isApproved: true
    };
    const options: FindOptions = {
        projection: getWordProjection(ip)
    };
    const word: Word | null = await collection.findOne<Word>(filter, options);

    if (!word) {
        return;
    }

    return word;
};

export const addWord = async (wordRequest: WordRequest, ip: string): Promise<Status> => {
    const wordDocument: WordDocument = {
        ...wordRequest,
        author: wordRequest.author ?? "Anonyme",
        slug: getSlug(wordRequest.label),
        ip,
        isApproved: false
    };

    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const result: InsertOneResult = await collection.insertOne(wordDocument);

    if (!result.acknowledged) {
        return Status.InternalError;
    }

    return Status.Created;
};
