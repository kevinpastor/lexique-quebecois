import { _closeMongoClient } from "src/app/api/database";

import { getAutocompletedWords } from "./get-autocompleted-words";
import "../../../../utils/tests/helpers";

afterAll(async (): Promise<void> => {
    await _closeMongoClient();
});

describe("getAutocompletedWords", (): void => {
    it("should get autocompleted words", async (): Promise<void> => {
        const spellings: Array<string> = await getAutocompletedWords("tok");

        expect(spellings.length).toBeGreaterThan(0);
    });
});
