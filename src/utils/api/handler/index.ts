import { NextApiRequest, NextApiResponse } from "next";

import { isValidMethod } from "@models/method";
import { Status } from "@models/status";
import { isDevelopmentEnvironment } from "@utils/misc/environment";

import { MethodHandler } from "./method-handler";
import { MethodHandlers } from "./method-handlers";

export type Options = {
    hidden?: boolean;
};

export type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export const createHandler = (methodHandlers: MethodHandlers, options?: Options): Handler => {
    const hidden: boolean = options?.hidden ?? false;

    return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        if (hidden && !isDevelopmentEnvironment()) {
            res.status(Status.NotFound)
                .end();
        }

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

        try {
            await handler(req, res);
        }
        catch (error: unknown) {
            console.error(`An unexpected error occured. ${error}`);
            res.status(Status.InternalError)
                .end();
        }
    };
};
