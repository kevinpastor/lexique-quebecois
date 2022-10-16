import { WithId } from "mongodb";

import { DefinitionDocument } from "./definition-document";

export interface WordDocument {
    spellings: Array<string>;
    definitions: Array<WithId<DefinitionDocument>>;
}
