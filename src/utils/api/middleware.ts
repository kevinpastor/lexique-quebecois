import { NextApiRequest, NextApiResponse } from "next";

export type MiddlewareHandler<T> = (result: Error | T) => void;
export type Middleware<T> = (req: NextApiRequest, res: NextApiResponse, handler: MiddlewareHandler<T>) => void;

export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, middleware: Middleware<unknown>): Promise<unknown> => {
    return new Promise((resolve, reject): void => {
        middleware(req, res, (result: Error | unknown): void => {
            if (result instanceof Error) {
                reject(result);
                return;
            }

            resolve(result);
        });
    });
};
