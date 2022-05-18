import { NextApiRequest, NextApiResponse } from "next";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { WordDocument } from "@models/word-document";
import { getWordDocuments } from "@services/api/words";
import {
    createHandler,
    Handler
} from "@utils/api/handler";
import { WithStringId } from "@utils/types/with-string-id";

const handler: Handler = createHandler({
    [Method.GET]: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        const wordDocuments: Array<WithStringId<WordDocument>> = await getWordDocuments();

        res.status(Status.OK)
            .json(wordDocuments);
    }
});

export default handler;
