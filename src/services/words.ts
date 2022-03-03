import { Collection, Db, FindOptions } from "mongodb";

import { Word } from "@models/word";
import { shuffle } from "@utils/random";
import { getDatabase } from "./database";
import { WordsPostRequestBody } from "@models/words-post-request-body";
import { getResourceName } from "@utils/word";

interface ModeratedWord extends Word {
    isApproved: boolean;
}

export const getWords = async (): Promise<Array<Word>> => {
    const database: Db = await getDatabase();
    const collection: Collection<ModeratedWord> = database.collection("definitions");
    const pipeline = [
        { $match: { isApproved: true } },
        { $sample: { size: 5 } },
        {
            $project: {
                _id: 0,
                isApproved: 0
            }
        }
    ];
    const words: Array<Word> = await collection.aggregate<Word>(pipeline)
        .toArray();

    return shuffle(words);
};

export const getWord = async (resourceName: string): Promise<Word | undefined> => {
    const database: Db = await getDatabase();
    const collection: Collection<ModeratedWord> = database.collection("definitions");
    const query = {
        resourceName,
        isApproved: true
    };
    const options: FindOptions = {
        projection: {
            _id: 0,
            isApproved: 0
        }
    };
    const word: Word | null = await collection.findOne(query, options);

    if (!word) {
        return;
    }

    return word;
};

export const addWord = async (word: WordsPostRequestBody): Promise<Word> => {
    const datedWord: Word = {
        ...word,
        resourceName: getResourceName(word.label),
        timestamp: new Date().getTime()
    };
    const moderatedWord: ModeratedWord = {
        ...datedWord,
        isApproved: false
    };

    const database: Db = await getDatabase();
    const collection: Collection<ModeratedWord> = database.collection("definitions");
    await collection.insertOne(moderatedWord);

    return datedWord;
};
