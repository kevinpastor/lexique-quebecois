import { ObjectId } from "mongodb";
import { z } from "zod";

import { objectIdSchema, objectWithIdSchema } from "./object-id-schema";

export interface SpellingDocument {
    spelling: string;
    wordId: ObjectId;
}

export const spellingDocumentSchema = z
    .object({
        spelling: z.string(),
        wordId: objectIdSchema
    })
    .strict();

export const spellingDocumentWithIdSchema = spellingDocumentSchema.merge(objectWithIdSchema);
