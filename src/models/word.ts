import { object, array, string } from "yup";

import { Definition, definitionSchema } from "./definition";

export interface Word {
    spellings: Array<string>;
    definitions: Array<Definition>;
}

export const wordSchema = object({
    spellings: array()
        .of(string())
        .required(),
    definitions: array()
        .of(definitionSchema)
        .required()
})
    .noUnknown()
    .required();
