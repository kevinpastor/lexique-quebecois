import { type ObjectId } from "mongodb";

import { type AuthorDocument } from "./author-document";
import { type ReactionsDocument } from "./reactions-document";
import { type WordClass } from "./word-class";

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
