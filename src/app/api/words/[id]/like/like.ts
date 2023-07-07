import { Collection, Db, Filter, ObjectId, UpdateFilter, UpdateResult } from "mongodb";

import { getDatabase } from "~/services/database";
import { Status } from "~/types/status";
import { WordDocument } from "~/types/word-document";

// Inspired by https://stackoverflow.com/a/28006849/7817501
export const like = async (id: string, ip: string): Promise<Status> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");

    const filter: Filter<WordDocument> = {
        definitions: {
            $elemMatch: {
                _id: new ObjectId(id),
                isApproved: true
            }
        }
    };
    const update: UpdateFilter<WordDocument> = {
        $addToSet: {
            "definitions.$.reactions.likes": ip
        },
        $pull: {
            "definitions.$.reactions.dislikes": ip
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
