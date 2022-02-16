import { injectable } from "inversify";
import { Collection, WithId } from "mongodb";

import { Word } from "@quebecois-urbain/shared/models/word";
import { DatabaseService } from "./database-service";

@injectable()
export class WordService {

    public constructor(
        private readonly databaseService: DatabaseService
    ) { }

    public async getWord(label: string): Promise<Word> {
        const collection: Collection<Word> = await this.databaseService.getCollection("definitions");
        const query = { label };
        const word: WithId<Word> | null = await collection.findOne(query);

        if (!word) {
            throw new Error("TODO Not found");
        }

        return word;
    }

    public addWord(label: string, definition: Word): Promise<Word> {
        console.log(label, definition);
        return Promise.resolve(definition); // TODO
    }

}
