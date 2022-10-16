import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "request-ip";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { Definition } from "@models/definition";
import { getDefinitionsSample } from "@services/api/words";
import {
    createHandler,
    Handler
} from "@utils/api/handler";

const handler: Handler = createHandler({
    [Method.GET]: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        const ip: string = getClientIp(req) ?? "";

        const words: Array<Definition> = await getDefinitionsSample(ip);

        res.status(Status.OK)
            .json(words);
    }
});

export default handler;
