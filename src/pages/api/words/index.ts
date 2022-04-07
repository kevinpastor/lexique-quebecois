import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "request-ip";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { Word } from "@models/word";
import { isValidWordRequest } from "@models/word-request";
import { addWord } from "@services/api/words";
import {
    createHandler,
    Handler
} from "@utils/api/handler";
import { RateLimiter } from "@utils/api/middlewares/rate-limiter";

const window: number = 1000 * 60 * 15;
const tokens: number = 5;
const rateLimiter = new RateLimiter(window, tokens);

const handler: Handler = createHandler({
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

        const word: Word = await addWord(req.body, ip);

        res.status(Status.Created)
            .json(word);
    }
});

export default handler;
