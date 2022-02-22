import { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncHandler = (...parameters: Parameters<RequestHandler>) => Promise<unknown>;

export const asyncHandler = (handler: AsyncHandler): RequestHandler => (
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await Promise.resolve(handler(req, res, next));
        }
        catch (error: unknown) {
            next(error);
        }
    }
);
