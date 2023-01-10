import { ObjectId } from "mongodb";
import { object, string } from "zod";

import { objectIdSchema, objectWithIdSchema } from "./object-id-schema";

export interface SpellingDocument {
    spelling: string;
    wordId: ObjectId;
}

export const spellingDocumentSchema = object({
    spelling: string(),
    wordId: objectIdSchema
})
    .strict();

export const spellingDocumentWithIdSchema = spellingDocumentSchema.merge(objectWithIdSchema);
