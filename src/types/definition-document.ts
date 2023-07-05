import { ObjectId } from "mongodb";
import { array, boolean, nativeEnum, object, string } from "zod";

import { AuthorDocument, authorDocumentSchema } from "./author-document";
import { objectIdSchema } from "./object-id-schema";
import { ReactionsDocument, reactionsDocumentSchema } from "./reactions-document";
import { WordClass } from "./word-class";

export interface DefinitionDocument {
    _id: ObjectId;
    label: string;
    definition: string;
    example: string;
    author: AuthorDocument;
    classes: Array<WordClass>;
    isApproved: boolean;
    reactions: ReactionsDocument;
}

export const definitionDocumentSchema = object({
    _id: objectIdSchema,
    label: string(),
    definition: string(),
    example: string(),
    author: authorDocumentSchema,
    classe: array(nativeEnum(WordClass)),
    isApproved: boolean(),
    reactions: reactionsDocumentSchema
})
    .strict();
