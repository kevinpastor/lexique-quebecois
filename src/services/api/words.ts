import { Collection, Db, InsertOneResult, WithId, ObjectId, Document } from "mongodb";

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
    wordClasses: 1,
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
        isApproved: false,
        likes: [],
        dislikes: []
    };

    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const result: InsertOneResult = await collection.insertOne(wordDocument);

    if (!result.acknowledged) {
        return Status.InternalError;
    }

    return Status.Created;
};

type WithScore<T> = T & {
    score: number;
};

export const getAutocompletedWords = async (query: string): Promise<Array<string>> => {
    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    const pipeline = [
        {
            $search: { // This operator is only accepted as the first in the pipeline.
                index: "labelAutocompleteSearchIndex",
                autocomplete: {
                    query,
                    path: "label"
                }
            }
        },
        approvedWordStage(),
        {
            $addFields: {
                score: {
                    $meta: "searchScore"
                }
            }
        },
        {
            $sort: {
                score: -1
            }
        }
    ];
    const words: Array<WithScore<WordDocument>> = await collection.aggregate<WithScore<WordDocument>>(pipeline)
        .toArray();

    return words.map(({ label }: WithScore<WordDocument>): string => (
        label
    ));
};
