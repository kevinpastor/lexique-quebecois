import { NextApiRequest, NextApiResponse } from "next";

import { Method, Status, Word } from "@models";
import { createHandler, Handler } from "@utils/handler";
import { isValidWordRequest } from "@utils/word";
import { addWord } from "@services/words";

const handler: Handler = createHandler({
    [Method.POST]: async ({ body }: NextApiRequest, res: NextApiResponse): Promise<void> => {
        if (!isValidWordRequest(body)) {
            res.status(Status.BadRequest)
                .end();
            return;
        }

        const word: Word = await addWord(body);

        res.status(Status.Created)
            .json(word);
    }
});

export default handler;
