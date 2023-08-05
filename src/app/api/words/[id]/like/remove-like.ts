import { type Collection, type Db, type Filter, ObjectId, type UpdateFilter, type UpdateResult } from "mongodb";

import { getDatabase } from "~/services/database";
import { Status } from "~/types/status";
import { type WordDocument } from "~/types/word-document";

export const removeLike = async (id: string, ip: string): Promise<Status> => {
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
        $pull: {
            "definitions.$.reactions.likes": ip
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
