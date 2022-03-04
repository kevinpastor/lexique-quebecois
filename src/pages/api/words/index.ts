import { NextApiRequest, NextApiResponse } from "next";

import { Method, Status, WordRequest } from "@models";
import { isValidWordRequest } from "@utils/word";
import { addWord } from "@services/words";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method !== Method.POST) {
        res.status(Status.MethodNotAllowed)
            .end();
        return;
    }

    if (!isValidWordRequest(req.body)) {
        res.status(Status.BadRequest)
            .end();
        return;
    }

    const wordRequest: WordRequest = req.body;
    const datedWord: unknown = await addWord(wordRequest);

    res.status(Status.Created)
        .json(datedWord);
};

export default handler;
