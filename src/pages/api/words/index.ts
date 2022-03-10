import { NextApiRequest, NextApiResponse } from "next";

import { Method, Status, Word, WordRequest } from "@models";
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

        const wordRequest: WordRequest = body;
        const datedWord: Word = await addWord(wordRequest);

        res.status(Status.Created)
            .json(datedWord);
    }
});

export default handler;
