import { Collection, Db, Document, ObjectId } from "mongodb";

import { defaultAggregateOptions, getDatabase } from "~/services/database";
import { Reactions } from "~/types/definition";
import { WordDocument } from "~/types/word-document";
import { safeInOperator } from "~/utils/api/aggregation/safe-in-operator";
import { safeSizeOperator } from "~/utils/api/aggregation/safe-size-operator";

export const getReactions = async (definitionIds: Array<string>, ip: string | undefined = ""): Promise<Array<Reactions>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");

    const pipeline: Array<Document> = [
        {
            $match: {
                definitions: {
                    $elemMatch: {
                        _id: {
                            $in: definitionIds.map((definitionId: string): ObjectId => (new ObjectId(definitionId)))
                        }
                    }
                }
            }
        },
        {
            $unwind: {
                path: "$definitions"
            }
        },
        {
            $match: {
                "definitions.isApproved": true,
                "definitions._id": {
                    $in: definitionIds.map((definitionId: string): ObjectId => (new ObjectId(definitionId)))
                }
            }
        },
        {
            $project: {
                likes: safeSizeOperator("$definitions.reactions.likes"),
                isLiked: safeInOperator("$definitions.reactions.likes", ip),
                dislikes: safeSizeOperator("$definitions.reactions.dislikes"),
                isDisliked: safeInOperator("$definitions.reactions.dislikes", ip)
            }
        }
    ];

    return collection.aggregate<Reactions>(pipeline, defaultAggregateOptions)
        .toArray();
};
