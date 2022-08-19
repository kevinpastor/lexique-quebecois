/**
 * @jest-environment jsdom
 */
import { WordClass } from "@models/classes";
import { Method } from "@models/method";
import { WordRequest } from "@models/word-request";

import { addWord } from "./words";

const fetchMock = jest.fn()
    .mockResolvedValue({
        ok: true
    } as Partial<Response> as Response);
global.fetch = fetchMock;

const wordRequestStub: WordRequest = {
    label: "gyu",
    wordClasses: [WordClass.Adjectif],
    definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
    example: "Le poulet était tellement gyu!",
    author: "Kevin"
};

describe("addWord", (): void => {
    beforeEach((): void => {
        fetchMock.mockClear();
    });

    it("should add word", async (): Promise<void> => {
        fetchMock
            .mockResolvedValue({
                ok: true
            } as Partial<Response> as Response);

        await addWord(wordRequestStub);

        expect(fetchMock).toBeCalledWith(
            "/api/words",
            expect.objectContaining({
                method: Method.POST
            })
        );
    });

    it("should throw an error", async (): Promise<void> => {
        fetchMock
            .mockResolvedValue({
                ok: false
            } as Partial<Response> as Response);

        await expect(addWord(wordRequestStub)).rejects.toBeDefined();

        expect(fetchMock).toBeCalledWith(
            "/api/words",
            expect.objectContaining({
                method: Method.POST
            })
        );
    });
});
