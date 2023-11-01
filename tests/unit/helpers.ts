import { expect } from "@jest/globals";
import { type BaseSchema, safeParse } from "valibot";

type CustomMatcherResult = ReturnType<Parameters<typeof expect.extend>[0][number]>;

const toMatchSchema = (value: unknown, schema: BaseSchema): CustomMatcherResult => {
    const result = safeParse(schema, value);

    if (result.success) {
        return {
            message: (): string => "expected value to match schema",
            pass: true
        };
    }

    return {
        message: (): string => result.issues[0].message,
        pass: false
    };
};

expect.extend({
    toMatchSchema
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toMatchSchema: (schema: BaseSchema) => R;
        }
    }
}
