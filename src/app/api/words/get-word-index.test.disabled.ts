import { _closeMongoClient } from "@app/api/database";
import "@utils/tests/helpers";

import { getWordIndex } from "./get-word-index";

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
