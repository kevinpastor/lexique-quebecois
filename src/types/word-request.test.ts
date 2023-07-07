import { WithToken } from "./with-token";
import { WordClass } from "./word-class";
import { WordRequest, cleanWordRequestWithToken, isWordRequestWithToken } from "./word-request";

const wordRequestWithTokenStub: WithToken<WordRequest> = {
    label: "gyu",
    wordClasses: [WordClass.Adjectif],
    definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
    example: "Le poulet était tellement gyu!",
    author: "Kevin",
    token: "token"
};

describe("isWordRequestWithToken", (): void => {
    // TODO Add test cases
    it.each([
        ["1"],
        ["&"],
        ["a"]
    ])("should not consider \"%s\" as a valid label", (label: string): void => {
        const value: WithToken<WordRequest> = {
            ...wordRequestWithTokenStub,
            label
        };

        const result: boolean = isWordRequestWithToken(value);

        expect(result).toBeFalsy();
    });

    it.each([
        ["aa"],
        ["àà"]
    ])("should consider \"%s\" as a valid label", (label: string): void => {
        const value: WithToken<WordRequest> = {
            ...wordRequestWithTokenStub,
            label
        };

        const result: boolean = isWordRequestWithToken(value);

        expect(result).toBeTruthy();
    });

    it("should not allow undefined", (): void => {
        const value: unknown = undefined;

        const result: boolean = isWordRequestWithToken(value);

        expect(result).toBeFalsy();
    });

    it("should not be a valid word request", (): void => {
        const value: unknown = {};

        const result: boolean = isWordRequestWithToken(value);

        expect(result).toBeFalsy();
    });

    it("should not allow no word class", (): void => {
        const result: boolean = isWordRequestWithToken({
            ...wordRequestWithTokenStub,
            wordClasses: undefined
        });

        expect(result).toBeFalsy();
    });

    it("should not allow invalid word class", (): void => {
        const result: boolean = isWordRequestWithToken({
            ...wordRequestWithTokenStub,
            wordClasses: ["foo"]
        });

        expect(result).toBeFalsy();
    });

    it("should be a valid word request", (): void => {
        const result: boolean = isWordRequestWithToken(wordRequestWithTokenStub);

        expect(result).toBeTruthy();
    });
});

describe("cleanWordRequestWithToken", (): void => {
    it("should not cleanup the word request", (): void => {
        const result: WordRequest = cleanWordRequestWithToken(wordRequestWithTokenStub);

        expect(result).toEqual(wordRequestWithTokenStub);
    });

    it("should remove empty author", (): void => {
        const value: WithToken<WordRequest> = {
            ...wordRequestWithTokenStub,
            author: ""
        };

        const result: WordRequest = cleanWordRequestWithToken(value);

        expect(result).not.toEqual(value);
        expect(result.author).toBeUndefined();
    });

    it("should trim attributes", (): void => {
        const value: WithToken<WordRequest> = {
            ...wordRequestWithTokenStub,
            author: "   John Doe   "
        };

        const result: WordRequest = cleanWordRequestWithToken(value);

        expect(result).not.toEqual(value);
        expect(result.author).toBeDefined();
    });
});
