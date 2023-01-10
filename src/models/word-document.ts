import { array, object, string } from "zod";

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

export const wordDocumentSchema = object({
    _id: objectIdSchema,
    spelling: string(),
    spellingAlt: string()
        .optional(),
    spellingAlt2: string()
        .optional(),
    spellingAlt3: string()
        .optional(),
    spellingAlt4: string()
        .optional(),
    definitions: array(definitionDocumentSchema)
})
    .strict();

export const wordDocumentWithIdSchema = wordDocumentSchema.merge(objectWithIdSchema);
