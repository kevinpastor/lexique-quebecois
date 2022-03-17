import { NextApiRequest, NextApiResponse } from "next";

import { isValidMethod, Method, Status } from "@models";

export type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export type MethodHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export type MethodHandlers = {
    [method in Method]?: MethodHandler;
};

export const createHandler = (methodHandlers: MethodHandlers): Handler => {
    return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        if (!req.method) {
            res.status(Status.BadRequest)
                .end();
            return;
        }

        if (!isValidMethod(req.method)) {
            res.status(Status.MethodNotAllowed)
                .end();
            return;
        }

        const handler: MethodHandler | undefined = methodHandlers[req.method];

        if (!handler) {
            res.status(Status.MethodNotAllowed)
                .end();
            return;
        }

        await handler(req, res);
    };
};
