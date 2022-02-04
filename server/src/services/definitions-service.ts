import { injectable } from "inversify";
import { Definition } from "../../../shared/models/definition";

@injectable()
export class DefinitionsService {

    public getDefinition(label: string): Promise<Definition> {
        return Promise.resolve({ // TODO
            id: "bjhabhiuadhbiu",
            label,
            definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
            example: "Le poulet était tellement gyu!",
            author: "Kevin",
            timestamp: "2 février 2022" as any
        });
    }

    public addDefinition(label: string, definition: Definition): Promise<Definition> {
        return Promise.resolve(definition); // TODO
    }

}
