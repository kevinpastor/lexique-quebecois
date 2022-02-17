import { injectable } from "inversify";
import { Collection, WithId } from "mongodb";

import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { Word } from "@quebecois-urbain/shared/models/word";
import { DatabaseService } from "./database-service";

@injectable()
export class WordService {

    public constructor(
        private readonly databaseService: DatabaseService
    ) { }

    public async getWord(label: string): Promise<DatedWord> {
        const collection: Collection<DatedWord> = await this.databaseService.getCollection("definitions");
        const query = { label };
        const word: WithId<DatedWord> | null = await collection.findOne(query);

        if (!word) {
            throw new Error("TODO Not found");
        }

        return word;
    }

    public addWord(word: Word): Promise<DatedWord> {
        console.log("Adding", word);
        // TODO
        return Promise.resolve({
            ...word,
            timestamp: new Date().getTime()
        });
    }

}
