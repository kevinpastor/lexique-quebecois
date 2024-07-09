import { Method } from "~/types/method";
import { type WithToken } from "~/types/with-token";
import { type WordRequest } from "~/types/word-request";
import { HttpError } from "~/utils/http-error";

export const addWord = async (wordRequestWithToken: WithToken<WordRequest>): Promise<void> => {
    const options: RequestInit = {
        method: Method.POST,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wordRequestWithToken)
    };
    const response: Response = await fetch("/api/words", options);

    if (!response.ok) {
        throw new HttpError(response.status);
    }
};
