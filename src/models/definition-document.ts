import { ObjectId } from "mongodb";
import { array, boolean, object, string } from "yup";

import { AuthorDocument, authorDocumentSchema } from "./author-document";
import { WordClass, wordClasses } from "./classes";
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

export const definitionDocumentSchema = object({
    _id: objectIdSchema
        .required(),
    label: string()
        .required(),
    definition: string()
        .required(),
    example: string()
        .required(),
    author: authorDocumentSchema,
    classe: array()
        .of(
            string()
                .oneOf(wordClasses)
        )
        .required(),
    isApproved: boolean()
        .required(),
    reactions: reactionsDocumentSchema
})
    .noUnknown()
    .required();
