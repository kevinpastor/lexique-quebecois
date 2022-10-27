import { AnySchema, ValidationError } from "yup";

expect.extend({
    toMatchSchema: (value: unknown, schema: AnySchema) => {
        try {
            schema.validateSync(value, { strict: true });
            return {
                message: (): string => "expected value to match schema",
                pass: true
            };
        }
        catch (error: unknown) {
            return {
                message: (): string => (error as ValidationError).message,
                pass: false
            };
        }
    }
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toMatchSchema: (schema: AnySchema) => R;
        }
    }
}
