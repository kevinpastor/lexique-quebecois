import { NextApiRequest } from "next";

import { RecursivePartial } from "@utils/types/recursive-partial";

export const createRequestStub = ({
    method,
    query,
    body,
    socket
}: RecursivePartial<NextApiRequest>): NextApiRequest => ({
    method: method ?? undefined,
    query: query ?? {},
    body: body ?? undefined,
    socket: socket ?? {
        remoteAddress: "1.1.1.1"
    }
} as RecursivePartial<NextApiRequest> as NextApiRequest);
