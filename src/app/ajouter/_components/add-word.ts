import { Method } from "~types/method";
import { WithCaptchaToken } from "~types/with-captcha-token";
import { WordRequest } from "~types/word-request";
import { HttpError } from "~utils/http-error";

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
