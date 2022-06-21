import { Collection, Db, Filter, ObjectId, UpdateFilter, UpdateResult } from "mongodb";

import { Status } from "@models/status";
import { WordDocument } from "@models/word-document";

import { getDatabase } from "./database";

// Inspired by https://stackoverflow.com/a/28006849/7817501
export const like = async (id: string, ip: string): Promise<Status> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");

    const filter: Filter<WordDocument> = {
        _id: new ObjectId(id),
        isApproved: true
    };
    const update: UpdateFilter<WordDocument> = {
        $addToSet: {
            likes: ip
        },
        $pull: {
            dislikes: ip
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

export const removeLike = async (id: string, ip: string): Promise<Status> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");

    const filter: Filter<WordDocument> = {
        _id: new ObjectId(id),
        isApproved: true
    };
    const update: UpdateFilter<WordDocument> = {
        $pull: {
            likes: ip
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

export const dislike = async (id: string, ip: string): Promise<Status> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");

    const filter: Filter<WordDocument> = {
        _id: new ObjectId(id),
        isApproved: true
    };
    const update: UpdateFilter<WordDocument> = {
        $addToSet: {
            dislikes: ip
        },
        $pull: {
            likes: ip
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

export const removeDislike = async (id: string, ip: string): Promise<Status> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");

    const filter: Filter<WordDocument> = {
        _id: new ObjectId(id),
        isApproved: true
    };
    const update: UpdateFilter<WordDocument> = {
        $pull: {
            dislikes: ip
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
