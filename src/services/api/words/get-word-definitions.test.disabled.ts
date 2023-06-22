import { Word, wordSchema } from "@models/word";
import { getWordDefinitions } from "@services/api/words/get-word-definitions";
import { _closeMongoClient } from "src/app/api/database";

import "../../../utils/tests/helpers";

const ip: string = "127.0.0.1";

afterAll(async (): Promise<void> => {
    await _closeMongoClient();
});

describe("getWordDefinitions", (): void => {
    const slug: string = "tokébak";

    it("should not find word", async (): Promise<void> => {
        const word: Word | null = await getWordDefinitions("inexisting-word", ip);

        expect(word).toBeNull();
    });

    it("should get word", async (): Promise<void> => {
        const word: Word | null = await getWordDefinitions(slug, ip);

        expect(word).toBeDefined();
        expect(word).toMatchSchema(wordSchema);
    });
});
