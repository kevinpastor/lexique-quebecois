import { Collection, Db, FindOptions } from "mongodb";

import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { shuffle } from "@utils/random";
import { getDatabase } from "./database";
import { Word } from "@quebecois-urbain/shared/models/word";

interface ModeratedWord extends DatedWord {
    isApproved: boolean;
}

export const getWords = async (): Promise<Array<DatedWord>> => {
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
    const words: Array<DatedWord> = await collection.aggregate<DatedWord>(pipeline)
        .toArray();

    return shuffle(words);
}

export const getWord = async (label: string): Promise<DatedWord | undefined> => {
    const database: Db = await getDatabase();
    const collection: Collection<ModeratedWord> = database.collection("definitions");
    const query = {
        label,
        isApproved: true
    };
    const options: FindOptions = {
        projection: {
            _id: 0,
            isApproved: 0
        }
    };
    const word: DatedWord | null = await collection.findOne(query, options);

    if (!word) {
        return;
    }

    return word;
}

export const addWord = async (word: Word): Promise<DatedWord> => {
    const datedWord: DatedWord = {
        ...word,
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
