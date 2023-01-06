import { ObjectId } from "mongodb";
import { z } from "zod";

import { AuthorDocument, authorDocumentSchema } from "./author-document";
import { WordClass } from "./classes";
import { objectIdSchema } from "./object-id-schema";
import { ReactionsDocument, reactionsDocumentSchema } from "./reactions-document";

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

export const definitionDocumentSchema = z
    .object({
        _id: objectIdSchema,
        label: z.string(),
        definition: z.string(),
        example: z.string(),
        author: authorDocumentSchema,
        classe: z.array(z.nativeEnum(WordClass)),
        isApproved: z.boolean(),
        reactions: reactionsDocumentSchema
    })
    .strict();
