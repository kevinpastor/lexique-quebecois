import { z } from "zod";

import { DefinitionDocument, definitionDocumentSchema } from "./definition-document";
import { objectIdSchema, objectWithIdSchema } from "./object-id-schema";

export interface WordDocument {
    spelling: string;
    spellingAlt?: string;
    spellingAlt2?: string;
    spellingAlt3?: string;
    spellingAlt4?: string;
    definitions: Array<DefinitionDocument>;
}

export const wordDocumentSchema = z
    .object({
        _id: objectIdSchema,
        spelling: z.string(),
        spellingAlt: z
            .string()
            .optional(),
        spellingAlt2: z
            .string()
            .optional(),
        spellingAlt3: z
            .string()
            .optional(),
        spellingAlt4: z
            .string()
            .optional(),
        definitions: z.array(definitionDocumentSchema)
    })
    .strict();

export const wordDocumentWithIdSchema = wordDocumentSchema.merge(objectWithIdSchema);
