import { NextApiRequest, NextApiResponse } from "next";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { WordDocument } from "@models/word-document";
import { updateWordDocument } from "@services/api/words";
import {
    createHandler,
    Handler
} from "@utils/api/handler";
import { isDevelopmentEnvironment } from "@utils/misc/environment";
import { WithStringId } from "@utils/types/with-string-id";

const handler: Handler = createHandler({
    [Method.POST]: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        if (!isDevelopmentEnvironment()) {
            res.status(Status.NotFound)
                .end();
            return;
        }

        const wordDocument: WithStringId<WordDocument> = req.body;

        const result: Status = await updateWordDocument(wordDocument);

        res.status(result)
            .end();
    }
});

export default handler;
