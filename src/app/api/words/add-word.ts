import { type Collection, type Db, type Document, type Filter, type InsertOneResult, ObjectId, type UpdateFilter, type UpdateResult, type WithId } from "mongodb";

import { defaultAggregateOptions, getDatabase } from "~/services/database";
import { type DefinitionDocument } from "~/types/definition-document";
import { Status } from "~/types/status";
import { type WordDocument } from "~/types/word-document";
import { type WordRequest } from "~/types/word-request";

export const addWord = async (wordRequest: WordRequest, ip: string): Promise<Status> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("words");
    const pipeline: Array<Document> = [
        {
            $search: {
                text: {
                    path: "spellings",
                    query: wordRequest.label
                }
            }
        }
    ];
    const match: WithId<WordDocument> | null = await collection.aggregate<WithId<WordDocument>>(pipeline, defaultAggregateOptions)
        .next();

    const definition: WithId<DefinitionDocument> = {
        _id: new ObjectId(),
        label: wordRequest.label,
        definition: wordRequest.definition,
        example: wordRequest.example,
        author: {
            ip,
            ...(wordRequest.author && { name: wordRequest.author })
        },
        classes: wordRequest.wordClasses,
        isApproved: false,
        reactions: {
            likes: [],
            dislikes: []
        }
    };

    if (!match) {
        const word: WordDocument = {
            spellings: [wordRequest.label],
            definitions: [definition]
        };

        const result: InsertOneResult<WithId<WordDocument>> = await collection.insertOne(word);

        if (!result.acknowledged) {
            return Status.InternalError;
        }

        return Status.Created;
    }

    const filter: Filter<WordDocument> = {
        _id: match._id
    };
    const update: UpdateFilter<WordDocument> = {
        $push: {
            definitions: definition
        }
    };
    const result: UpdateResult = await collection.updateOne(filter, update);

    if (!result.acknowledged || result.modifiedCount !== 1) {
        return Status.InternalError;
    }

    return Status.Created;
};
