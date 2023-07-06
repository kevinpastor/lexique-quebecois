import { DefinitionDocument } from "./definition-document";

export interface WordDocument {
    spellings: Array<string>;
    definitions: Array<DefinitionDocument>;
}
