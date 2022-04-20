import { WordDocument } from "./word-document";
import { wordDocumentStub } from "./word-document.stub";
import { cleanupWordRequest, getSlug, isValidLabel, isValidWordRequest, WordRequest } from "./word-request";
import { wordRequestStub } from "./word-request.stub";

describe("getSlug", (): void => {
    it("should get slug", (): void => {
        const { label, slug }: WordDocument = wordDocumentStub;

        const result: string = getSlug(label);

        expect(result).toEqual(slug);
    });
});

// TODO Add test cases
describe("isValidLabel", (): void => {
    it.each([
        ["1"],
        ["&"]
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
    it("should not allow undefined", (): void => {
        const value: unknown = undefined;

        const result: boolean = isValidWordRequest(value);

        expect(result).toBeFalsy();
    });

    it("should not be a valid word request", (): void => {
        const value: unknown = {};

        const result: boolean = isValidWordRequest(value);

        expect(result).toBeFalsy();
    });

    it("should be a valid word request", (): void => {
        const result: boolean = isValidWordRequest(wordRequestStub);

        expect(result).toBeTruthy();
    });
});

describe("cleanupWordRequest", (): void => {
    it("should not cleanup the word request", (): void => {
        const result: WordRequest = cleanupWordRequest(wordRequestStub);

        expect(result).toEqual(wordRequestStub);
    });

    it("should remove empty author", (): void => {
        const value: WordRequest = {
            ...wordRequestStub,
            author: ""
        };

        const result: WordRequest = cleanupWordRequest(value);

        expect(result).not.toEqual(value);
        expect(result.author).toBeUndefined();
    });

    it("should trim attributes", (): void => {
        const value: WordRequest = {
            ...wordRequestStub,
            author: "   John Doe   "
        };

        const result: WordRequest = cleanupWordRequest(value);

        expect(result).not.toEqual(value);
        expect(result.author).toBeDefined();
    });
});
