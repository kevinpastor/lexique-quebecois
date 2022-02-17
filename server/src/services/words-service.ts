import { injectable } from "inversify";
import { Collection, FindOptions } from "mongodb";

import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { Word } from "@quebecois-urbain/shared/models/word";
import { DatabaseService } from "./database-service";
import { shuffle } from "../utils/shuffle";

@injectable()
export class WordService {

    public constructor(
        private readonly databaseService: DatabaseService
    ) { }

    public async getWord(label: string): Promise<DatedWord> {
        const collection: Collection<DatedWord> = await this.databaseService.getCollection("definitions");
        const query = { label };
        const options: FindOptions = {
            projection: {
                _id: 0
            }
        };
        const word: DatedWord | null = await collection.findOne(query, options);

        if (!word) {
            throw new Error("TODO Not found");
        }

        return word;
    }

    public async getWords(): Promise<Array<DatedWord>> {
        const collection: Collection<DatedWord> = await this.databaseService.getCollection("definitions");
        const pipeline = [
            { $sample: { size: 5 } },
            { $project: { _id: 0 } }
        ];
        const words: Array<DatedWord> = await collection.aggregate<DatedWord>(pipeline)
            .toArray();

        return shuffle(words);
    }

    public async addWord(word: Word): Promise<void> {
        const datedWord: DatedWord = {
            ...word,
            timestamp: new Date().getTime()
        };

        const collection: Collection<DatedWord> = await this.databaseService.getCollection("definitions");
        await collection.insertOne(datedWord);
    }

}
