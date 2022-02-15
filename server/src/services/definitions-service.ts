import { injectable } from "inversify";
import { Collection, WithId } from "mongodb";

import { Definition } from "@quebecois-urbain/shared/models/definition";
import { DatabaseService } from "./database-service";

@injectable()
export class DefinitionsService {

    public constructor(
        private readonly databaseService: DatabaseService
    ) { }

    public async getDefinition(label: string): Promise<Definition> {
        const collection: Collection<Definition> = await this.databaseService.getCollection("definitions");
        const query = { label };
        const definition: WithId<Definition> | null = await collection.findOne(query);

        if (!definition) {
            throw new Error("TODO Not found");
        }

        return definition;
    }

    public addDefinition(label: string, definition: Definition): Promise<Definition> {
        return Promise.resolve(definition); // TODO
    }

}
