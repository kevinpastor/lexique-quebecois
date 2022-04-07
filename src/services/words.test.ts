/**
 * @jest-environment jsdom
 */
import { Method } from "@models/method";
import { wordRequestStub } from "@models/word-request.stub";

import { addWord } from "./words";

describe("@services", (): void => {
    describe("words", (): void => {
        describe("addWord", (): void => {
            const fetchMock = jest.fn()
                .mockResolvedValue({
                    ok: true
                } as Partial<Response> as Response);
            global.fetch = fetchMock;

            beforeEach((): void => {
                fetchMock.mockClear();
            });

            it("should add word", async (): Promise<void> => {
                await addWord(wordRequestStub);

                expect(fetchMock).toBeCalledWith(
                    "/api/words",
                    expect.objectContaining({
                        method: Method.POST
                    })
                );
            });

            it("should throw an error", (): void => {
                fetchMock
                    .mockResolvedValue({
                        ok: false
                    } as Partial<Response> as Response);

                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                expect(addWord(wordRequestStub)).rejects.toBeDefined();
            });
        });
    });
});
