import { Schema, ZodError } from "zod";

expect.extend({
    toMatchSchema: (value: unknown, schema: Schema) => {
        try {
            schema.parse(value);
            return {
                message: (): string => "expected value to match schema",
                pass: true
            };
        }
        catch (error: unknown) {
            return {
                message: (): string => (error as ZodError).message,
                pass: false
            };
        }
    }
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toMatchSchema: (schema: Schema) => R;
        }
    }
}
