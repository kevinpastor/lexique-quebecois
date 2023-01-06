import { z } from "zod";

import { Definition, definitionSchema } from "./definition";

export interface Word {
    spellings: Array<string>;
    definitions: Array<Definition>;
}

export const wordSchema = z
    .object({
        spellings: z.array(z.string()),
        definitions: z.array(definitionSchema)
    })
    .strict();
