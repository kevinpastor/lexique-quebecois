import { isObject, isString } from "../utils/validators";

export interface Word {
    label: string;
    definition: string;
    example: string;
    author?: string;
    timestamp: Date;
}

export const isValidWord = (word: any): word is Word => (
    isObject(word)
    && isString(word.label)
    && isString(word.definition)
    && isString(word.example)
    && isString(word.author)
    && isString(word.timestamp)
);

export const cleanWord = (word: any): Word => ({
    label: word.label,
    definition: word.definition,
    example: word.example,
    author: word.author,
    timestamp: word.timestamp
})