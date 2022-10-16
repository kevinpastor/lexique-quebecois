import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "request-ip";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { Definition } from "@models/definition";
import { getWordDefinitions } from "@services/api/words";
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

        // ID is used here as the spelling to get the word collection
        const spelling: string = req.query.id;
        const wordDefinitions: Array<Definition> = await getWordDefinitions(spelling, ip);

        res.status(Status.OK)
            .json(wordDefinitions);
    }
});

export default handler;
