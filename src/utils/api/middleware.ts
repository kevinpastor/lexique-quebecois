import { NextApiRequest, NextApiResponse } from "next";

export type MiddlewareHandler<T> = (result: Error | T) => void;
export type Middleware<T> = (req: NextApiRequest, res: NextApiResponse, handler: MiddlewareHandler<T>) => void;

export const createMiddleware = (middleware: Middleware<unknown>) => {
    return (req: NextApiRequest, res: NextApiResponse): Promise<unknown> => {
        return new Promise((resolve, reject): void => {
            try {
                middleware(req, res, (result: Error | unknown): void => {
                    if (result instanceof Error) {
                        console.log("bhaeiubehb", result);
                        reject(result);
                        return;
                    }

                    console.log("oiuh34buih34uib", result);
                    resolve(result);
                });
            }
            catch (e: unknown) {
                console.log("icicieahv", e);
            }

            console.log("enruhinuhei");
        });
    };
};

export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, middleware: Middleware<unknown>): Promise<unknown> => {
    return new Promise((resolve, reject): void => {
        middleware(req, res, (result: Error | unknown): void => {
            if (result instanceof Error) {
                console.log(result);
                reject(result);
                return;
            }

            resolve(result);
        });
    });
};
