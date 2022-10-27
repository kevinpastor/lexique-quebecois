import { object, string } from "yup";

export const objectIdSchema = object({
    _oid: string()
        .required()
})
    .noUnknown();

export const objectWithIdSchema = object({
    _id: objectIdSchema
        .required()
})
    .noUnknown();
