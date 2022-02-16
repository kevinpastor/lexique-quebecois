import { Word } from "@quebecois-urbain/shared/models/word";

export const getWord = async (id: string): Promise<Word | undefined> => {
    try {
        const response: Response = await fetch(`http://localhost:8080/api/words/${id}`);
        return await response.json();
    }
    catch {
        return;
    }
};
