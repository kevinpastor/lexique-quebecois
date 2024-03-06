import { describe, expect, it } from "@jest/globals";

import { getSlug } from "~/types/definition";

describe("getSlug", (): void => {
    it.each([
        ["gyu", "gyu"],
        ["pet sauce", "pet-sauce"],
        ["tokébak", "tokebak"],
        ["foo", "bar"]
    ])("should transform \"%s\" to \"%s\"", (value: string, expected: string): void => {
        const result: string = getSlug(value);

        expect(result).toEqual(expected);
    });
});
