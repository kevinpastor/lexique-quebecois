import { NextApiRequest, NextApiResponse } from "next";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { getAutocompletedWords } from "@services/api/words/get-autocompleted-words";
import {
    createHandler,
    Handler
} from "@utils/api/handler";

const handler: Handler = createHandler({
    [Method.GET]: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        if (!req.query.input || Array.isArray(req.query.input)) {
            res.status(Status.BadRequest)
                .end();
            return;
        }

        const input: string = req.query.input;
        const words: Array<string> = await getAutocompletedWords(input);

        res.status(Status.OK)
            .json(words);
    }
});

export default handler;
