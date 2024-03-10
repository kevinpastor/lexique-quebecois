import { describe, expect, it } from "vitest";

import { insert } from "./array";

describe("insert", (): void => {
    it.each([
        [[0, 1, 2], 1, -1, [0, -1, 1, 2]],
        [[0, 1, 2], 0, -1, [-1, 0, 1, 2]]
    ])("should `insert(%p, %d, %d)` return `%p`", (array: Array<unknown>, index: number, item: unknown, expected: Array<unknown>): void => {
        const result: Array<unknown> = insert(array, index, item);

        expect(result).toEqual(expected);
    });

    it("should support inserting multiple elements", (): void => {
        const array: Array<unknown> = [0, 1, 2];

        const result: Array<unknown> = insert(array, 0, -1, -2, -3);

        expect(result).toEqual([-1, -2, -3, 0, 1, 2]);
    });
});
