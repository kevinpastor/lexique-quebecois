import { Method } from "@models/method";
import { WithCaptchaToken } from "@models/with-captcha-token";
import { WordRequest } from "@models/word-request";
import { HttpError } from "@services/http-error";

export const addWord = async (wordRequestWithCaptchaToken: WithCaptchaToken<WordRequest>): Promise<void> => {
    const options: RequestInit = {
        method: Method.POST,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wordRequestWithCaptchaToken)
    };
    const response: Response = await fetch("/api/words", options);

    if (!response.ok) {
        throw new HttpError(response.status);
    }
};
