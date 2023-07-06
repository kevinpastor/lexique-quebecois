import { Definition } from "./definition";

export interface Word {
    spellings: Array<string>;
    definitions: Array<Definition>;
}
