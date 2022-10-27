import { ObjectId } from "mongodb";
import { object, string } from "yup";

import { objectIdSchema, objectWithIdSchema } from "./object-id-schema";

export interface SpellingDocument {
    spelling: string;
    wordId: ObjectId;
}

export const spellingDocumentSchema = object({
    spelling: string()
        .required(),
    wordId: objectIdSchema
        .required()
})
    .noUnknown()
    .required();

export const spellingDocumentWithIdSchema = spellingDocumentSchema.concat(objectWithIdSchema);
