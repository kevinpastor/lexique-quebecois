import { NextApiRequest, NextApiResponse } from "next";

export type MethodHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
