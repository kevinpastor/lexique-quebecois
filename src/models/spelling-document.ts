import { ObjectId } from "mongodb";

export interface SpellingDocument {
    spelling: string;
    wordId: ObjectId;
}
