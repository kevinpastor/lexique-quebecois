import { Method } from "@models/method";
import { WordRequest } from "@models/word-request";

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
        throw new Error("TODO");
    }
};
