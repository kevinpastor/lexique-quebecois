import { Socket } from "net";
import { NextApiRequest } from "next";

import { Method } from "@models/method";

interface StubInput {
    method?: Method;
    query?: Record<string, unknown>;
    body?: unknown;
    socket?: Socket;
}

export const createRequestStub = ({
    method,
    query,
    body,
    socket
}: StubInput): NextApiRequest => ({
    method: method ?? undefined,
    query: query ?? {},
    body: body ?? undefined,
    socket: socket ?? {
        remoteAddress: "1.1.1.1"
    }
} as NextApiRequest);
