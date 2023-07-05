import { array, object, string } from "zod";

import { DefinitionDocument, definitionDocumentSchema } from "./definition-document";
import { objectIdSchema, objectWithIdSchema } from "./object-id-schema";

export interface WordDocument {
    spellings: Array<string>;
    definitions: Array<DefinitionDocument>;
}

export const wordDocumentSchema = object({
    _id: objectIdSchema,
    spellings: array(string()),
    definitions: array(definitionDocumentSchema)
})
    .strict();

export const wordDocumentWithIdSchema = wordDocumentSchema.merge(objectWithIdSchema);
