import { Collection, Db, InsertOneResult, WithId, ObjectId, UpdateFilter, UpdateResult, DeleteResult, Document } from "mongodb";

import { Status } from "@models/status";
import { Word } from "@models/word";
import { WordDocument } from "@models/word-document";
import { WordRequest, getSlug } from "@models/word-request";
import { countArrayOperation } from "@utils/api/aggregation/operations/count-array-operation";
import { inArrayOperation } from "@utils/api/aggregation/operations/in-array-operation";
import { timestampOperation } from "@utils/api/aggregation/operations/timestamp-operation";
import { reviewSortStages } from "@utils/api/aggregation/stages/review-sort-stages";
import { sample } from "@utils/misc/random";
import { InclusiveProjection } from "@utils/types/projection";
import { WithStringId } from "@utils/types/with-string-id";

import { getDatabase } from "./database";

const approvedWordStage = (): Document => ({
    $match: {
        isApproved: true
    }
});

const wordProjectionOperation = (ip: string): InclusiveProjection<WordDocument, Word> => ({
    _id: 0,
    id: {
        $toString: "$_id"
    },
    label: 1,
    slug: 1,
    definition: 1,
    example: 1,
    author: 1,
    timestamp: timestampOperation(),
    likes: countArrayOperation("$likes"),
    isLiked: inArrayOperation("$likes", ip),
    dislikes: countArrayOperation("$dislikes"),
    isDisliked: inArrayOperation("$dislikes", ip)
});

const wordProjectionStage = (ip: string): Document => ({
    $project: wordProjectionOperation(ip)
});

export const getWordIndex = async (): Promise<Array<string>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const pipeline = [
        approvedWordStage(),
        {
            $sort: {
                slug: 1
            }
        },
        {
            $project: {
                _id: 0,
                label: 1
            }
        }
    ];
    const wordIndex: Array<Pick<Word, "label">> = await collection.aggregate<Pick<Word, "label">>(pipeline)
        .toArray();

    return wordIndex.map(({ label }: Pick<Word, "label">): string => (
        label
    ));
};

export const getWordsSlug = async (): Promise<Array<string>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const pipeline = [
        approvedWordStage(),
        {
            $sort: {
                slug: 1
            }
        },
        {
            $project: {
                _id: 0,
                slug: 1
            }
        }
    ];
    const words: Array<Pick<Word, "slug">> = await collection.aggregate<Pick<Word, "slug">>(pipeline)
        .toArray();

    return words.map(({ slug }: Pick<Word, "slug">): string => (
        slug
    ));
};

export const getWordsSample = async (ip: string = ""): Promise<Array<Word>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const idsPipeline = [
        approvedWordStage(),
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
        // ...reviewSortStages(
        //     countArrayOperation("$likes"),
        //     countArrayOperation("$dislikes")
        // ),
        wordProjectionStage(ip)
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

export const getWordCollection = async (slug: string, ip: string = ""): Promise<Array<Word>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const pipeline = [
        {
            $match: {
                slug,
                isApproved: true
            }
        },
        ...reviewSortStages(
            countArrayOperation("$likes"),
            countArrayOperation("$dislikes")
        ),
        wordProjectionStage(ip)
    ];
    const wordCollection: Array<Word> = await collection.aggregate<Word>(pipeline)
        .toArray();

    return wordCollection;
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
