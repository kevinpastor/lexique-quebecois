import { Socket } from "net";
import { NextApiRequest } from "next";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { like, removeLike } from "@services/api/reactions";
import { RateLimiter } from "@utils/api/middlewares/rate-limiter";
import { createRequestStub } from "@utils/tests/request";
import { createResponseStub } from "@utils/tests/response";

// TODO Create path alias
import handler from "../../../../../../src/pages/api/words/[id]/like";

jest.mock("@services/api/reactions");
const likeMock = like as jest.MockedFunction<typeof like>;
const removeLikeMock = removeLike as jest.MockedFunction<typeof removeLike>;

const consumeMock = jest.spyOn(RateLimiter.prototype, "consume");

describe("PUT", (): void => {
    beforeEach((): void => {
        consumeMock.mockReturnValue(false);
    });

    afterEach((): void => {
        jest.resetAllMocks();
    });

    it("should not like with no ip", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.PUT,
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

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.Unauthorized);
        expect(endMock).toBeCalled();
    });

    it("should limit request rate", async (): Promise<void> => {
        consumeMock.mockReturnValue(true);
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.PUT
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

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.TooManyRequest);
        expect(endMock).toBeCalled();
    });

    it("should not allow missing slug", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.PUT
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

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.BadRequest);
        expect(endMock).toBeCalled();
    });

    it("should not allow invalid slug", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.PUT,
            query: {
                slug: ["gyu"]
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

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.BadRequest);
        expect(endMock).toBeCalled();
    });

    it("should not like non existent word", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.PUT,
            query: {
                id: "507f1f77bcf86cd799439011"
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
        likeMock.mockResolvedValue(Status.NotFound);

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.NotFound);
        expect(endMock).toBeCalled();
    });

    it("should not like already liked word", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.PUT,
            query: {
                id: "507f1f77bcf86cd799439011"
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
        likeMock.mockResolvedValue(Status.Conflict);

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.Conflict);
        expect(endMock).toBeCalled();
    });

    it("should like", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.PUT,
            query: {
                id: "507f1f77bcf86cd799439011"
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
        likeMock.mockResolvedValue(Status.OK);

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.OK);
        expect(endMock).toBeCalled();
    });
});

describe("DELETE", (): void => {
    beforeEach((): void => {
        consumeMock.mockReturnValue(false);
    });

    afterEach((): void => {
        consumeMock.mockReset();
        removeLikeMock.mockReset();
    });

    it("should not remove like with no ip", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.DELETE,
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

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.Unauthorized);
        expect(endMock).toBeCalled();
    });

    // TODO Find alternative so that tests are isolated for rate limiting
    it("should limit request rate", async (): Promise<void> => {
        consumeMock.mockReturnValue(true);
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.DELETE
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

        await handler(reqStub, resStub);

        expect(statusMock).toHaveBeenLastCalledWith(Status.TooManyRequest);
        expect(endMock).toBeCalled();
    });

    it("should not allow missing slug", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.DELETE
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

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.BadRequest);
        expect(endMock).toBeCalled();
    });

    it("should not allow invalid slug", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.DELETE,
            query: {
                slug: ["gyu"]
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

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.BadRequest);
        expect(endMock).toBeCalled();
    });

    it("should not remove like on non existent word", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.DELETE,
            query: {
                id: "507f1f77bcf86cd799439011"
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
        removeLikeMock.mockResolvedValue(Status.NotFound);

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.NotFound);
        expect(endMock).toBeCalled();
    });

    it("should not remove non existent like", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.DELETE,
            query: {
                id: "507f1f77bcf86cd799439011"
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
        removeLikeMock.mockResolvedValue(Status.Conflict);

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.Conflict);
        expect(endMock).toBeCalled();
    });

    it("should remove like", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.DELETE,
            query: {
                id: "507f1f77bcf86cd799439011"
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
        removeLikeMock.mockResolvedValue(Status.OK);

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.OK);
        expect(endMock).toBeCalled();
    });
});
