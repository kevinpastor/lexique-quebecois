import { NextApiRequest, NextApiResponse } from "next";

import { Method, Status, WordRequest } from "@models";
import { isValidWordRequest } from "@utils/word";
import { addWord } from "@services/words";

type Handler = () => Promise<void>;

type Handlers = {
    [method in Method]?: Handler;
};

const genericHandler = async ({ method }: NextApiRequest, res: NextApiResponse, handlers: Handlers): Promise<void> => {
    const handler: Handler | undefined = handlers[method as Method];

    if (!handler) {
        res.status(Status.MethodNotAllowed)
            .end();
        return;
    }

    await handler();
};

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    await genericHandler(req, res, {
        [Method.POST]: async (): Promise<void> => {
            if (!isValidWordRequest(req.body)) {
                res.status(Status.BadRequest)
                    .end();
                return;
            }

            const wordRequest: WordRequest = req.body;
            const datedWord: unknown = await addWord(wordRequest);

            res.status(Status.Created)
                .json(datedWord);
        }
    });
};

export default handler;
