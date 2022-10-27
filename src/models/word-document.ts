import { object, array, string } from "yup";

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
    _id: objectIdSchema
        .required(),
    spelling: string()
        .required(),
    spellingAlt: string()
        .optional(),
    spellingAlt2: string()
        .optional(),
    spellingAlt3: string()
        .optional(),
    spellingAlt4: string()
        .optional(),
    definitions: array()
        .of(definitionDocumentSchema)
        .required()
})
    .noUnknown()
    .required();

export const wordDocumentWithIdSchema = wordDocumentSchema.concat(objectWithIdSchema);
