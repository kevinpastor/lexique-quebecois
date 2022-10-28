import { Method } from "@models/method";
import { WordRequest } from "@models/word-request";

import { HttpError } from "./http-error";

export const addWord = async (wordRequest: WordRequest): Promise<void> => {
    const options: RequestInit = {
        method: Method.POST,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wordRequest)
    };
    const response: Response = await fetch("/api/words", options);

    if (!response.ok) {
        throw new HttpError(response.status);
    }
};

export const getAutocompletedWords = async (input: string): Promise<Array<string>> => {
    const url: string = `/api/words/autocomplete?input=${input}`;
    const response: Response = await fetch(url);

    if (!response.ok) {
        throw new HttpError(response.status);
    }

    const autocompletedWords: Array<string> = await response.json();

    return autocompletedWords;
};
