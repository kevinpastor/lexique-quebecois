import { describe, expect, it } from "vitest";

import { isInteger } from "./number";

describe("isInteger", (): void => {
    it.each([
        ["0"],
        ["1"],
        ["985427"]
    ])("should consider `%d` as an integer", (value: string): void => {
        const result = isInteger(value);

        expect(result).toBe(true);
    });

    it.each([
        [" 0"],
        ["0 "],
        ["hello"],
        ["NaN"],
        ["undefined"]
    ])("should not consider `%p` as an integer", (value: string): void => {
        const result = isInteger(value);

        expect(result).toBe(false);
    });
});
