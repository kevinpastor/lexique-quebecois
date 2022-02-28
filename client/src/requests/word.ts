import { Word } from "@quebecois-urbain/shared/models/word";

export const addWord = async (word: Word): Promise<boolean> => {
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
