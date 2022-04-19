import { Collection, Db, Filter, FindOptions, UpdateFilter, UpdateResult } from "mongodb";

import { Word } from "@models/word";
import { WordDocument } from "@models/word-document";
import { WordRequest, getSlug } from "@models/word-request";
import { shuffle } from "@utils/misc/random";
import { InclusiveProjection } from "@utils/types/projection";

import { getDatabase } from "./database";

const wordProjection: InclusiveProjection<WordDocument, Word> = {
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
                    // ! TODO
                    "::1",
                    "$likes"
                ]
            },
            else: false
        }
    }
};

export const getWordIndex = async (): Promise<Array<string>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const pipeline = [
        { $match: { isApproved: true } },
        { $sort: { slug: 1 } },
        {
            $project: wordProjection
        }
    ];
    const words: Array<Word> = await collection.aggregate<Word>(pipeline)
        .toArray();

    return words.map(({ label }: Word): string => (
        label
    ));
};

export const getWordsSample = async (): Promise<Array<Word>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const pipeline = [
        { $match: { isApproved: true } },
        { $sample: { size: 5 } },
        {
            $project: wordProjection
        }
    ];
    const words: Array<Word> = await collection.aggregate<Word>(pipeline)
        .toArray();

    return shuffle(words);
};

export const getWord = async (slug: string): Promise<Word | undefined> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const filter: Partial<WordDocument> = {
        slug
        // ! TODO Uncomment
        // isApproved: true
    };
    const options: FindOptions = {
        projection: wordProjection
    };
    const word: Word | null = await collection.findOne<Word>(filter, options);

    if (!word) {
        return;
    }

    return word;
};

export const addWord = async (wordRequest: WordRequest, ip: string): Promise<void> => {
    const wordDocument: WordDocument = {
        ...wordRequest,
        author: wordRequest.author ?? "Anonyme",
        slug: getSlug(wordRequest.label),
        ip,
        isApproved: false
    };

    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    await collection.insertOne(wordDocument);
};

// https://stackoverflow.com/questions/28006521/how-to-model-a-likes-voting-system-with-mongodb
export const like = async (slug: string, ip: string): Promise<boolean> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");

    const filter: Filter<WordDocument> = {
        slug,
        likes: {
            $ne: ip
        }
        // ! TODO Uncomment
        // isApproved: true
    };
    const update: UpdateFilter<WordDocument> = {
        $push: {
            likes: ip
        }
    };
    const result: UpdateResult = await collection.updateOne(filter, update);

    return result.modifiedCount !== 0;
};

export const removeLike = async (slug: string, ip: string): Promise<boolean> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");

    const filter: Filter<WordDocument> = {
        slug
        // ! TODO Uncomment
        // isApproved: true
    };
    const update: UpdateFilter<WordDocument> = {
        $pull: {
            likes: ip
        }
    };
    const result: UpdateResult = await collection.updateOne(filter, update);

    if (result.matchedCount === 0) {
        throw new Error("Not found");
    }

    return result.modifiedCount !== 0;
};
