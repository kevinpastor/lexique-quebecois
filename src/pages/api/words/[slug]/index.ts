import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "request-ip";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { Word } from "@models/word";
import { getWord } from "@services/api/words";
import {
    createHandler,
    Handler
} from "@utils/api/handler";

const handler: Handler = createHandler({
    [Method.GET]: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        const ip: string | null = getClientIp(req);
        if (!ip) {
            res.status(Status.Unauthorized)
                .end();
            return;
        }

        if (!req.query.slug || Array.isArray(req.query.slug)) {
            res.status(Status.BadRequest)
                .end();
            return;
        }

        const slug: string = req.query.slug;
        const word: Word | undefined = await getWord(slug, ip);

        if (!word) {
            res.status(Status.NotFound)
                .end();
            return;
        }

        res.status(Status.OK)
            .json(word);
    }
});

export default handler;
