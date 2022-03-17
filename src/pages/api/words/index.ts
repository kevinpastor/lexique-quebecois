import { NextApiRequest, NextApiResponse } from "next";

import { Method, Status, Word } from "@models";
import { createHandler, Handler } from "@utils/handler";
import { isValidWordRequest } from "@utils/word";
import { addWord } from "@services/words";

import { rateLimit } from "express-rate-limit";
import { Middleware, runMiddleware } from "@utils/api/middleware";

const limiter: Middleware<unknown> = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1,
    standardHeaders: false,
    legacyHeaders: false,
    keyGenerator: (req: NextApiRequest, _: NextApiResponse): string => (
        (req.headers["x-real-ip"] as string | undefined)
        || req.socket.remoteAddress
        || ""
    )
});

const handler: Handler = createHandler({
    [Method.POST]: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        try {
            await runMiddleware(req, res, limiter);
        }
        catch {
            res.status(Status.TooManyRequest)
                .end();
            return;
        }

        if (!isValidWordRequest(req.body)) {
            res.status(Status.BadRequest)
                .end();
            return;
        }

        const word: Word = await addWord(req.body);

        res.status(Status.Created)
            .json(word);
    }
});

export default handler;
