import { Collection, Db, FindOptions } from "mongodb";

import { Word } from "@models/word";
import { WordRequest, getSlug } from "@models/word-request";
import { shuffle } from "@utils/misc/random";
import { Projection } from "@utils/types/projection";
import { WordDocument } from "@models/word-document";

import { getDatabase } from "./database";

const wordProjection: Projection<WordDocument, Word> = {
    _id: 0,
    isApproved: 0,
    ip: 0
};

export const getWords = async (): Promise<Array<Word>> => {
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
        slug,
        isApproved: true
    };
    const options: FindOptions = {
        projection: wordProjection
    };
    const word: Word | null = await collection.findOne(filter, options);

    if (!word) {
        return;
    }

    return word;
};

export const addWord = async (wordRequest: WordRequest, ip: string): Promise<Word> => {
    const word: Required<Word> = {
        ...wordRequest,
        author: wordRequest.author ?? "Anonyme",
        slug: getSlug(wordRequest.label),
        timestamp: new Date().getTime()
    };
    const wordDocument: WordDocument = {
        ...word,
        ip,
        isApproved: false
    };

    const database: Db = await getDatabase();
    const collection: Collection<WordDocument> = database.collection("definitions");
    await collection.insertOne(wordDocument);

    return word;
};
