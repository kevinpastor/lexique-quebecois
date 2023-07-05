import { Definition, definitionSchema } from "@models/definition";
import { _closeMongoClient } from "@services/database";
import "@utils/tests/helpers";

import { getDefinitionsSample } from "./get-definitions-sample";

const ip: string = "127.0.0.1";

afterAll(async (): Promise<void> => {
    await _closeMongoClient();
});

describe("getDefinitionsSample", (): void => {
    it("should get word sample", async (): Promise<void> => {
        const words: Array<Definition> = await getDefinitionsSample(ip);

        expect(words).toHaveLength(5);
        expect(words[0]).toMatchSchema(definitionSchema);
        expect(new Set(words.map(({ label }: Definition): string => (label))).size).toBe(5);
    });
});
