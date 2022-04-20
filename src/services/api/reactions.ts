import { Collection, Db, Filter, UpdateFilter, UpdateResult } from "mongodb";

import { WordDocument } from "@models/word-document";

import { getDatabase } from "./database";

// Inspired by https://stackoverflow.com/a/28006849/7817501
export const like = async (slug: string, ip: string): Promise<boolean> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");

    const filter: Filter<WordDocument> = {
        slug,
        likes: {
            $ne: ip
        },
        isApproved: true
    };
    const update: UpdateFilter<WordDocument> = {
        $push: {
            likes: ip
        },
        $pull: {
            dislikes: ip
        }
    };
    const result: UpdateResult = await collection.updateOne(filter, update);

    return result.modifiedCount !== 0;
};

export const removeLike = async (slug: string, ip: string): Promise<boolean> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");

    const filter: Filter<WordDocument> = {
        slug,
        isApproved: true
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

export const dislike = async (slug: string, ip: string): Promise<boolean> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");

    const filter: Filter<WordDocument> = {
        slug,
        dislikes: {
            $ne: ip
        },
        isApproved: true
    };
    const update: UpdateFilter<WordDocument> = {
        $push: {
            dislikes: ip
        },
        $pull: {
            likes: ip
        }
    };
    const result: UpdateResult = await collection.updateOne(filter, update);

    return result.modifiedCount !== 0;
};

export const removeDislike = async (slug: string, ip: string): Promise<boolean> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");

    const filter: Filter<WordDocument> = {
        slug,
        isApproved: true
    };
    const update: UpdateFilter<WordDocument> = {
        $pull: {
            dislikes: ip
        }
    };
    const result: UpdateResult = await collection.updateOne(filter, update);

    if (result.matchedCount === 0) {
        throw new Error("Not found");
    }

    return result.modifiedCount !== 0;
};
