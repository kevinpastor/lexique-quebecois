import { _closeMongoClient } from "@services/api/database";
import { getWordIndex } from "@services/api/words/get-word-index";

import "../../../../src/utils/tests/helpers";

afterAll(async (): Promise<void> => {
    await _closeMongoClient();
});

describe("getWordIndex", (): void => {
    it("should get word index", async (): Promise<void> => {
        const wordIndex: Array<string> = await getWordIndex();

        expect(Array.isArray(wordIndex)).toBeTruthy();
        expect(wordIndex.length).toBeGreaterThan(0);
        expect(typeof wordIndex[0]).toBe("string");
    });
});
