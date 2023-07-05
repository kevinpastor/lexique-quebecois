import { Collection, Db, InsertOneResult, WithId, ObjectId, Filter, UpdateFilter, UpdateResult, Document } from "mongodb";

import { DefinitionDocument } from "@models/definition-document";
import { Status } from "@models/status";
import { WordDocument } from "@models/word-document";
import { WordRequest } from "@models/word-request";
import { defaultAggregateOptions, getDatabase } from "@services/database";

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
