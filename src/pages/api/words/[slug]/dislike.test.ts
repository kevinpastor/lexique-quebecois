import { NextApiRequest } from "next";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { dislike, removeDislike } from "@services/api/reactions";
import { createRequestStub } from "@utils/tests/request";
import { createResponseStub } from "@utils/tests/response";

import handler from "./dislike";

jest.mock("@services/api/reactions");
const dislikeMock = dislike as jest.MockedFunction<typeof dislike>;
const removeDislikeMock = removeDislike as jest.MockedFunction<typeof removeDislike>;

describe("PUT", (): void => {
    beforeEach((): void => {
        jest.useFakeTimers();
    });

    afterEach((): void => {
        jest.useRealTimers();
    });

    it("should not dislike with no ip", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.PUT,
            socket: {}
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

    it.skip("should limit request rate", async (): Promise<void> => {
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

    it("should not dislike non existent word", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.PUT,
            query: {
                slug: "gyu"
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
        dislikeMock.mockResolvedValue(Status.NotFound);

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.NotFound);
        expect(endMock).toBeCalled();
    });

    it("should not dislike already disliked word", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.PUT,
            query: {
                slug: "gyu"
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
        dislikeMock.mockResolvedValue(Status.Conflict);

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.Conflict);
        expect(endMock).toBeCalled();
    });

    it("should dislike", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.PUT,
            query: {
                slug: "gyu"
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
        dislikeMock.mockResolvedValue(Status.OK);

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.OK);
        expect(endMock).toBeCalled();
    });
});

describe("DELETE", (): void => {
    beforeEach((): void => {
        jest.useFakeTimers();
    });

    afterEach((): void => {
        jest.useRealTimers();
    });

    it("should not remove dislike with no ip", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.DELETE,
            socket: {}
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

    it.skip("should limit request rate", async (): Promise<void> => {
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

        expect(statusMock).toBeCalledWith(Status.TooManyRequest);
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

    it("should not remove dislike on non existent word", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.DELETE,
            query: {
                slug: "gyu"
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
        removeDislikeMock.mockResolvedValue(Status.NotFound);

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.NotFound);
        expect(endMock).toBeCalled();
    });

    it("should not remove non existent dislike", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.DELETE,
            query: {
                slug: "gyu"
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
        removeDislikeMock.mockResolvedValue(Status.Conflict);

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.Conflict);
        expect(endMock).toBeCalled();
    });

    it("should remove dislike", async (): Promise<void> => {
        const reqStub: NextApiRequest = createRequestStub({
            method: Method.DELETE,
            query: {
                slug: "gyu"
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
        removeDislikeMock.mockResolvedValue(Status.OK);

        await handler(reqStub, resStub);

        expect(statusMock).toBeCalledWith(Status.OK);
        expect(endMock).toBeCalled();
    });
});
