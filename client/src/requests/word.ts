import { Word } from "@quebecois-urbain/shared/models/word";
import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";

export const getWord = async (id: string): Promise<DatedWord | undefined> => {
    try {
        const response: Response = await fetch(`http://localhost:8080/api/words/${id}`);

        if (!response.ok) {
            return;
        }

        return await response.json();
    }
    catch {
        return;
    }
};

export const addWord = async (word: Word): Promise<boolean> => {
    try {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(word)
        };
        const response: Response = await fetch("http://localhost:8080/api/words", options);

        return response.ok;
    }
    catch {
        return false;
    }
};
