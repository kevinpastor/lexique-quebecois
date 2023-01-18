import { Socket } from "net";
import { NextApiRequest } from "next";

import { WordClass } from "@models/classes";
import { Method } from "@models/method";
import { Status } from "@models/status";
import { WordRequest } from "@models/word-request";
import { addWord } from "@services/api/words/add-word";
import { RateLimiter } from "@utils/api/middlewares/rate-limiter";
import { createRequestStub } from "@utils/tests/request";
import { createResponseStub } from "@utils/tests/response";

// TODO Create path alias
import handler from "../../../../src/pages/api/words/index";

jest.mock("@services/api/words/add-word");
const addWordMock = addWord as jest.MockedFunction<typeof addWord>;

const consumeMock = jest.spyOn(RateLimiter.prototype, "consume");

const wordRequestStub: WordRequest = {
    label: "gyu",
    wordClasses: [WordClass.Adjectif],
    definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
    example: "Le poulet était tellement gyu!",
    author: "Kevin"
};

describe("POST", (): void => {
    beforeEach((): void => {
        consumeMock.mockReturnValue(false);
    });

    afterEach((): void => {
        jest.resetAllMocks();
    });

    it("should not allow empty request", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.POST
        });
        const {
            stub: resStub,
            status: {
                mock: statusMock,
                end: {
                    mock: endMock
                }
            }
        } = createResponseStub();
        reqStub.body = undefined;
        await handler(reqStub, resStub);

        expect(statusMock).toHaveBeenCalledWith(Status.BadRequest);
        expect(endMock).toHaveBeenCalled();
    });

    it("should not allow invalid request", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.POST,
            body: {
                label: "foo"
            }
        });
        const {
            stub: resStub,
            status: {
                mock: statusMock,
                end: {
                    mock: endMock
                }
            }
        } = createResponseStub();
        reqStub.body = {
            label: "foo"
        };

        await handler(reqStub, resStub);

        expect(statusMock).toHaveBeenCalledWith(Status.BadRequest);
        expect(endMock).toHaveBeenCalled();
    });

    it("should add word", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.POST,
            body: wordRequestStub
        });
        const {
            stub: resStub,
            status: {
                mock: statusMock,
                end: {
                    mock: endMock
                }
            }
        } = createResponseStub();
        addWordMock.mockResolvedValue(Status.Created);

        await handler(reqStub, resStub);

        expect(statusMock).toHaveBeenCalledWith(Status.Created);
        expect(endMock).toHaveBeenCalled();
    });

    it("should handle no ip", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.POST,
            body: wordRequestStub,
            socket: {} as Socket
        });
        const {
            stub: resStub,
            status: {
                mock: statusMock,
                end: {
                    mock: endMock
                }
            }
        } = createResponseStub();
        addWordMock.mockResolvedValue(Status.Created);

        await handler(reqStub, resStub);

        expect(statusMock).toHaveBeenCalledWith(Status.Created);
        expect(endMock).toHaveBeenCalled();
    });

    it("should limit requests", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.POST,
            body: wordRequestStub
        });
        const {
            stub: resStub,
            status: {
                mock: statusMock,
                end: {
                    mock: endMock
                }
            }
        } = createResponseStub();
        consumeMock.mockReturnValue(true);

        await handler(reqStub, resStub);

        expect(statusMock).toHaveBeenCalledWith(Status.TooManyRequest);
        expect(endMock).toHaveBeenCalled();
    });
});
