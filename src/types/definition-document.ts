import { ObjectId } from "mongodb";

import { AuthorDocument } from "./author-document";
import { ReactionsDocument } from "./reactions-document";
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
