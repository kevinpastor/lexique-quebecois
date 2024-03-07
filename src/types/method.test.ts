import { describe, expect, it } from "vitest";

import { Method, isValidMethod } from "~/types/method";

describe("isValidMethod", (): void => {
    describe("when given a valid method", (): void => {
        it.each([
            [Method.GET],
            [Method.POST],
            [Method.PUT],
            [Method.DELETE]
        ])("should consider \"%s\" as valid", (method: string): void => {
            const result: boolean = isValidMethod(method);

            expect(result).toBeTruthy();
        });
    });

    describe("when given an invalid method", (): void => {
        it.each([
            ["foo"],
            ["bar"]
        ])("should not consider \"%s\" as valid", (method: string): void => {
            const result: boolean = isValidMethod(method);

            expect(result).toBeFalsy();
        });
    });
});
