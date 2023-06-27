import { _closeMongoClient } from "@app/api/database";
import { getWordDefinitions } from "@app/api/words/[id]/get-word-definitions";
import { Status } from "@models/status";
import { Word } from "@models/word";

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

describe("dislike", (): void => {
    beforeEach((): void => {
        jest.resetAllMocks();
    });

    it("should not dislike non existent word", async (): Promise<void> => {
        const result: Status = await dislike("000000000000000000000000", ip);

        expect(result).toEqual(Status.NotFound);
    });

    it("should not dislike already disliked word", async (): Promise<void> => {
        await removeDislike(id, ip);
        await dislike(id, ip);

        const result: Status = await dislike(id, ip);
        expect(result).toEqual(Status.Conflict);
    });

    it("should dislike", async (): Promise<void> => {
        await removeDislike(id, ip);

        const result: Status = await dislike(id, ip);
        expect(result).toEqual(Status.OK);
    });
});
