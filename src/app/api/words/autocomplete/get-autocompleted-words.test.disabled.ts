import { _closeMongoClient } from "@services/database";
import "@utils/tests/helpers";

import { getAutocompletedWords } from "./get-autocompleted-words";

afterAll(async (): Promise<void> => {
    await _closeMongoClient();
});

describe("getAutocompletedWords", (): void => {
    it("should get autocompleted words", async (): Promise<void> => {
        const spellings: Array<string> = await getAutocompletedWords("tok");

        expect(spellings.length).toBeGreaterThan(0);
    });
});
