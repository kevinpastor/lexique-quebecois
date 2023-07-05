import { getWordDefinitions } from "@app/mots/[slug]/_services/get-word-definitions";
import { Status } from "@models/status";
import { Word } from "@models/word";
import { _closeMongoClient } from "@services/database";

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

describe("like", (): void => {
    beforeEach((): void => {
        jest.resetAllMocks();
    });

    it("should not like non existent word", async (): Promise<void> => {
        const result: Status = await like("000000000000000000000000", ip);

        expect(result).toEqual(Status.NotFound);
    });

    it("should not like already liked word", async (): Promise<void> => {
        await removeLike(id, ip);
        await like(id, ip);

        const result: Status = await like(id, ip);
        expect(result).toEqual(Status.Conflict);
    });

    it("should like", async (): Promise<void> => {
        await removeLike(id, ip);

        const result: Status = await like(id, ip);
        expect(result).toEqual(Status.OK);
    });
});
