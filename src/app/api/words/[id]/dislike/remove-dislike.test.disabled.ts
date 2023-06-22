import { Status } from "@models/status";
import { Word } from "@models/word";
import { getWordDefinitions } from "@services/api/words/get-word-definitions";
import { _closeMongoClient } from "src/app/api/database";

import { dislike } from "./dislike";
import { removeDislike } from "./remove-dislike";

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

describe("removeDislike", (): void => {
    beforeEach((): void => {
        jest.resetAllMocks();
    });

    it("should not remove dislike on non existant word", async (): Promise<void> => {
        const result: Status = await removeDislike("000000000000000000000000", ip);

        expect(result).toEqual(Status.NotFound);
    });

    it("should not remove non existent dislike", async (): Promise<void> => {
        await removeDislike(id, ip);

        const result: Status = await removeDislike(id, ip);

        expect(result).toEqual(Status.Conflict);
    });

    it("should remove dislike", async (): Promise<void> => {
        await dislike(id, ip);

        const result: Status = await removeDislike(id, ip);

        expect(result).toEqual(Status.OK);
    });
});
