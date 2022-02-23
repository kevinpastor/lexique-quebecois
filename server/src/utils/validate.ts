import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

import { ResponseCode } from "../routes/response-code";

export const validate = (schema: yup.AnySchema) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const isValid: boolean = await schema.isValid({
        body: req.body,
        query: req.query,
        params: req.params
    }, { strict: true });

    if (!isValid) {
        res.status(ResponseCode.BadRequest)
            .send();
        return;
    }

    next();
};
