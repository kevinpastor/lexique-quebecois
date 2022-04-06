import {
    getSlug,
    isValidLabel,
    isValidWordRequest,
    cleanupWordRequest,
    WordRequest
} from "./word-request";

describe("@models", (): void => {
    describe("word-request", (): void => {
        describe("getSlug", (): void => {
            it("should get slug", (): void => {
                const label: string = "foo bar";

                const result: string = getSlug(label);

                expect(result).toEqual("foo-bar");
            });
        });

        // TODO Add test cases
        describe("isValidLabel", (): void => {
            it.each([
                ["1"],
                [" "]
            ])("should not consider \"%s\" as valid", (value: string): void => {
                const result: boolean = isValidLabel(value);

                expect(result).toBeFalsy();
            });

            it.each([
                ["a"]
                // ["à"] // TODO Fix failing test
            ])("should consider \"%s\" as valid", (value: string): void => {
                const result: boolean = isValidLabel(value);

                expect(result).toBeTruthy();
            });
        });

        describe("isValidWordRequest", (): void => {
            it("should not be a valid word request", (): void => {
                const value: unknown = {};

                const result: boolean = isValidWordRequest(value);

                expect(result).toBeFalsy();
            });

            it("should be a valid word request", (): void => {
                const value: WordRequest = {
                    label: "foo",
                    definition: "bar",
                    example: "baz"
                };

                const result: boolean = isValidWordRequest(value);

                expect(result).toBeTruthy();
            });
        });

        describe("cleanupWordRequest", (): void => {
            it("should not cleanup the word request", (): void => {
                const value: WordRequest = {
                    label: "foo",
                    definition: "bar",
                    example: "baz"
                };

                const result: WordRequest = cleanupWordRequest(value);

                expect(result).toEqual(value);
            });

            it("should remove empty author", (): void => {
                const value: WordRequest = {
                    label: "foo",
                    definition: "bar",
                    example: "baz",
                    author: ""
                };

                const result: WordRequest = cleanupWordRequest(value);

                expect(result).not.toEqual(value);
                expect(result.author).toBeUndefined();
            });

            it("should trim attributes", (): void => {
                const value: WordRequest = {
                    label: "foo  ",
                    definition: "  bar",
                    example: "baz",
                    author: "John Doe"
                };

                const result: WordRequest = cleanupWordRequest(value);

                expect(result).not.toEqual(value);
                expect(result.author).toBeDefined();
            });
        });
    });
});
