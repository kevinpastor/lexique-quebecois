import { NextApiRequest, NextApiResponse } from "next";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { WordDocument } from "@models/word-document";
import { getWordDocument, updateWordDocument } from "@services/api/words";
import {
    createHandler,
    Handler
} from "@utils/api/handler";
import { WithStringId } from "@utils/types/with-string-id";

const handler: Handler = createHandler({
    [Method.GET]: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        if (!req.query.id || Array.isArray(req.query.id)) {
            res.status(Status.BadRequest)
                .end();
            return;
        }

        const id: string = req.query.id;
        const wordDocument: WithStringId<WordDocument> | undefined = await getWordDocument(id);

        if (!wordDocument) {
            res.status(Status.NotFound)
                .end();
            return;
        }

        res.status(Status.OK)
            .json(wordDocument);
    },
    [Method.POST]: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        const wordDocument: WithStringId<WordDocument> = req.body;

        const result: Status = await updateWordDocument(wordDocument);

        res.status(result)
            .end();
    }
}, { hidden: true });

export default handler;
