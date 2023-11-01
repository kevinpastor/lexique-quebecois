import { describe, expect, it } from "@jest/globals";

import { Method, isValidMethod } from "~/types/method";

describe("isValidMethod", (): void => {
    it.each([
        [Method.GET],
        [Method.POST],
        [Method.PUT],
        [Method.DELETE]
    ])("should consider \"%s\" as a valid method", (method: string): void => {
        const result: boolean = isValidMethod(method);

        expect(result).toBeTruthy();
    });

    it.each([
        ["foo"],
        ["bar"]
    ])("should not consider \"%s\" as a valid method", (method: string): void => {
        const result: boolean = isValidMethod(method);

        expect(result).toBeFalsy();
    });
});
