import { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncHandler = (...parameters: Parameters<RequestHandler>) => Promise<unknown>;

export const asyncHandler = (handler: AsyncHandler): RequestHandler => (
    (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(handler(req, res, next))
            // eslint-disable-next-line promise/no-callback-in-promise
            .catch(next);
    }
);
