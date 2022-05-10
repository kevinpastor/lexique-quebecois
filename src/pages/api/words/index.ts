import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "request-ip";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { isValidWordRequest } from "@models/word-request";
import { addWord, getWordIndex } from "@services/api/words";
import {
    createHandler,
    Handler
} from "@utils/api/handler";
import { RateLimiter } from "@utils/api/middlewares/rate-limiter";

const window: number = 1000 * 60 * 15;
const tokens: number = 5;
const rateLimiter = new RateLimiter(window, tokens);

const handler: Handler = createHandler({
    [Method.GET]: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        const ip: string = getClientIp(req) ?? "";

        const words: Array<string> = await getWordIndex(ip);

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

        if (!isValidWordRequest(req.body)) {
            res.status(Status.BadRequest)
                .end();
            return;
        }

        const result: Status = await addWord(req.body, ip);

        res.status(result)
            .end();
    }
});

export default handler;
