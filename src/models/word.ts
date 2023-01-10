import { array, object, string } from "zod";

import { Definition, definitionSchema } from "./definition";

export interface Word {
    spellings: Array<string>;
    definitions: Array<Definition>;
}

export const wordSchema = object({
    spellings: array(string()),
    definitions: array(definitionSchema)
})
    .strict();
