import { Word } from "@quebecois-urbain/shared/models/word";
import { DatedWord } from "@quebecois-urbain/shared/models/dated-word";
import { getUrl } from ".";

export const getWord = async (isSSR: boolean, id: string): Promise<DatedWord | undefined> => {
    try {
        const response: Response = await fetch(getUrl(`/api/words/${id}`, isSSR));

        if (!response.ok) {
            return;
        }

        return await response.json();
    }
    catch {
        return;
    }
};

export const getWords = async (isSSR: boolean): Promise<Array<DatedWord> | undefined> => {
    try {
        const response: Response = await fetch(getUrl("/api/words/", isSSR));

        if (!response.ok) {
            return;
        }

        return await response.json();
    }
    catch {
        return;
    }
};

export const addWord = async (isSSR: boolean, word: Word): Promise<boolean> => {
    try {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(word)
        };
        const response: Response = await fetch(getUrl("/api/words", isSSR), options);

        return response.ok;
    }
    catch {
        return false;
    }
};
