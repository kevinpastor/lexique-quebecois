import { isNumber } from "../utils/validators";
import { cleanWord, isValidWord, Word } from "./word";

export interface DatedWord extends Word {
    timestamp: number;
}

export const isValidDatedWord = (word: any): word is DatedWord => (
    isValidWord(word)
    && isNumber((word as any).timestamp)
);

export const cleanDatedWord = (word: any): DatedWord => ({
    ...cleanWord(word),
    timestamp: word.timestamp
});
