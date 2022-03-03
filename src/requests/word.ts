import { WordsPostRequestBody } from "@models/words-post-request-body";

export const addWord = async (word: WordsPostRequestBody): Promise<boolean> => {
    try {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(word)
        };
        const response: Response = await fetch("/api/words", options);

        return response.ok;
    }
    catch {
        return false;
    }
};
