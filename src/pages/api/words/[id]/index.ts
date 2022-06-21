import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "request-ip";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { Word } from "@models/word";
import { getWordCollection } from "@services/api/words";
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

        if (!req.query.id || Array.isArray(req.query.id)) {
            res.status(Status.BadRequest)
                .end();
            return;
        }

        // ID is used here as the slug to get the word collection
        const slug: string = req.query.id;
        const wordCollection: Array<Word> | undefined = await getWordCollection(slug, ip);

        if (!wordCollection) {
            res.status(Status.NotFound)
                .end();
            return;
        }

        res.status(Status.OK)
            .json(wordCollection);
    }
});

export default handler;
