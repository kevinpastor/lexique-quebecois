import { WordRequest } from "@models";

export const addWord = async (wordRequest: WordRequest): Promise<boolean> => {
    try {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wordRequest)
        };
        const response: Response = await fetch("/api/words", options);

        return response.ok;
    }
    catch {
        return false;
    }
};
