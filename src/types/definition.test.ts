import { getSlug } from "./definition";

describe("getSlug", (): void => {
    it.each([
        ["gyu", "gyu"],
        ["pet sauce", "pet-sauce"],
        ["tokébak", "tokebak"]
    ])("should transform \"%s\" to \"%s\"", (value: string, expected: string): void => {
        const result: string = getSlug(value);

        expect(result).toEqual(expected);
    });
});
