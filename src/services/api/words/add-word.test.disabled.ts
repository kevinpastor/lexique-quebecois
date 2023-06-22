import { WordClass } from "@models/classes";
import { Status } from "@models/status";
import { WordRequest } from "@models/word-request";
import { addWord } from "@services/api/words/add-word";
import { _closeMongoClient } from "src/app/api/database";

import "../../../utils/tests/helpers";

const ip: string = "127.0.0.1";

const wordRequestStub: WordRequest = {
    label: "gyu",
    wordClasses: [WordClass.Adjectif],
    definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
    example: "Le poulet était tellement gyu!",
    author: "Kevin"
};

afterAll(async (): Promise<void> => {
    await _closeMongoClient();
});

describe("addWord", (): void => {
    beforeAll((): void => {
        jest.useFakeTimers();
    });

    afterAll((): void => {
        jest.useRealTimers();
    });

    it("should add an anonymous word", async (): Promise<void> => {
        const anonymousWordRequestStub: WordRequest = {
            ...wordRequestStub,
            author: undefined
        };
        jest.setSystemTime(0);

        const result: Status = await addWord(anonymousWordRequestStub, ip);

        expect(result).toEqual(Status.Created);
    });

    it("should add a word", async (): Promise<void> => {
        jest.setSystemTime(0);

        const result: Status = await addWord(wordRequestStub, ip);

        expect(result).toEqual(Status.Created);
    });

    it.skip("should add a word", async (): Promise<void> => {
        const result: Status = await addWord(wordRequestStub, ip);

        expect(result).toEqual(Status.InternalError);
    });
});
