import { ObjectId, WithId } from "mongodb";

import { DefinitionDocument } from "./definition-document";

export interface Spelling {
    spelling: string;
    wordId: ObjectId;
}

export interface WordDocument {
    definitions: Array<WithId<DefinitionDocument>>;
}
