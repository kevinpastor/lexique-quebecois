import { Collection, Db, FindOptions, InsertOneResult } from "mongodb";

import { Status } from "@models/status";
import { Word } from "@models/word";
import { WordDocument } from "@models/word-document";
import { WordRequest, getSlug } from "@models/word-request";
import { shuffle } from "@utils/misc/random";
import { InclusiveProjection } from "@utils/types/projection";

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
        { $match: { isApproved: true } },
        { $sort: { slug: 1 } },
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

export const getWordsSample = async (ip: string): Promise<Array<Word>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const pipeline = [
        { $match: { isApproved: true } },
        { $sample: { size: 5 } },
        {
            $project: getWordProjection(ip)
        }
    ];
    const words: Array<Word> = await collection.aggregate<Word>(pipeline)
        .toArray();

    return shuffle(words);
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
    const result: InsertOneResult =  await collection.insertOne(wordDocument);

    if (!result.acknowledged) {
        return Status.InternalError;
    }

    return Status.Created;
};
