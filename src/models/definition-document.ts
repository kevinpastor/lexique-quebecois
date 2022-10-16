import { AuthorDocument } from "./author-document";
import { WordClass } from "./classes";
import { ReactionsDocument } from "./reactions-document";

export interface DefinitionDocument {
    label: string;
    definition: string;
    example: string;
    author: AuthorDocument;
    classes: Array<WordClass>;
    isApproved: boolean;
    reactions: ReactionsDocument;
}
