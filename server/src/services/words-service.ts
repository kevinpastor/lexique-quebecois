import { injectable } from "inversify";
import { Collection, FindOptions } from "mongodb";

import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { Word } from "@quebecois-urbain/shared/models/word";
import { DatabaseService } from "./database-service";
import { shuffle } from "../utils/shuffle";

interface ModeratedWord extends DatedWord {
    isApproved: boolean;
}

@injectable()
export class WordService {

    public constructor(
        private readonly databaseService: DatabaseService
    ) { }

    public async getWord(label: string): Promise<DatedWord> {
        const collection: Collection<ModeratedWord> = await this.databaseService.getCollection("definitions");
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
            throw new Error(`Could not find word in database. Looking for "${label}".`);
        }

        return word;
    }

    public async getWords(): Promise<Array<DatedWord>> {
        const collection: Collection<ModeratedWord> = await this.databaseService.getCollection("definitions");
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

    public async addWord(word: Word): Promise<DatedWord> {
        const datedWord: DatedWord = {
            ...word,
            timestamp: new Date().getTime()
        };
        const moderatedWord: ModeratedWord = {
            ...datedWord,
            isApproved: false
        };

        const collection: Collection<ModeratedWord> = await this.databaseService.getCollection("definitions");
        await collection.insertOne(moderatedWord);

        return datedWord;
    }

}
