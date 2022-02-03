import { injectable } from "inversify";
import { Definition } from "../../../shared/models/definition";

@injectable()
export class DefinitionsService {

    public getDefinition(label: string): Definition {
        return {
            id: "bjhabhiuadhbiu",
            label,
            definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
            example: "Le poulet était tellement gyu!",
            author: "Kevin",
            timestamp: "2 février 2022" as any
        };
    }

}
