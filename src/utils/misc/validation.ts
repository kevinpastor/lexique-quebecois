import * as yup from "yup";

export const isValid = <T>(value: unknown, schema: yup.AnySchema): value is T => (
    schema.isValidSync(value, { strict: true })
);
