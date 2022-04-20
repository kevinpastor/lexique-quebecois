import { Method } from "@models/method";
import { WordRequest } from "@models/word-request";

import { createError } from "./errors/http-error-factory";

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
        throw createError(response.status);
    }
};
