import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "request-ip";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { isValidWordRequest } from "@models/word-request";
import { addWord } from "@services/api/words/add-word";
import { getWordIndex } from "@services/api/words/get-word-index";
import {
    createHandler,
    Handler
} from "@utils/api/handler";
import { RateLimiter } from "@utils/api/middlewares/rate-limiter";
import { verifyHCaptcha } from "@utils/misc/hcaptcha";

const window: number = 1000 * 60 * 15;
const tokens: number = 5;
const rateLimiter = new RateLimiter(window, tokens);

const handler: Handler = createHandler({
    [Method.GET]: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        const words: Array<string> = await getWordIndex();

        res.status(Status.OK)
            .json(words);
    },
    [Method.POST]: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        const ip: string = getClientIp(req) ?? "";
        if (rateLimiter.consume(ip)) {
            res.status(Status.TooManyRequest)
                .end();
            return;
        }

        if (!req.body.captchaToken) {
            res.status(Status.Unauthorized)
                .end();
            return;
        }
        if (typeof req.body.captchaToken !== "string") {
            res.status(Status.BadRequest)
                .end();
            return;
        }
        const captchaToken: string = req.body.captchaToken;

        const isValidCaptcha: boolean = await verifyHCaptcha(captchaToken);
        if (!isValidCaptcha) {
            res.status(Status.Unauthorized)
                .end();
            return;
        }

        const { captchaToken: _, ...wordRequest } = req.body;

        if (!isValidWordRequest(wordRequest)) {
            res.status(Status.BadRequest)
                .end();
            return;
        }

        const result: Status = await addWord(wordRequest, ip);

        res.status(result)
            .end();
    }
});

export default handler;
