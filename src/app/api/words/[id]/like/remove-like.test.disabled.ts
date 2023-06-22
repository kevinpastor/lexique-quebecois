import { Status } from "@models/status";
import { Word } from "@models/word";
import { _closeMongoClient } from "src/app/api/database";
import { getWordDefinitions } from "src/app/api/words/[id]/get-word-definitions";

import { like } from "./like";
import { removeLike } from "./remove-like";

const ip: string = "127.0.0.1";
// eslint-disable-next-line @typescript-eslint/init-declarations
let id: string;

beforeAll(async (): Promise<void> => {
    const word: Word | null = await getWordDefinitions("gyu", ip);
    expect(word).toBeDefined();
    expect(word?.definitions.length).toBeGreaterThan(0);
    id = (word as Word).definitions[0].id;
});

afterAll(async (): Promise<void> => {
    await _closeMongoClient();
});

describe("removeLike", (): void => {
    beforeEach((): void => {
        jest.resetAllMocks();
    });

    it("should not remove like on non existant word", async (): Promise<void> => {
        const result: Status = await removeLike("000000000000000000000000", ip);

        expect(result).toEqual(Status.NotFound);
    });

    it("should not remove non existent like", async (): Promise<void> => {
        await removeLike(id, ip);

        const result: Status = await removeLike(id, ip);

        expect(result).toEqual(Status.Conflict);
    });

    it("should remove like", async (): Promise<void> => {
        await like(id, ip);

        const result: Status = await removeLike(id, ip);

        expect(result).toEqual(Status.OK);
    });
});
