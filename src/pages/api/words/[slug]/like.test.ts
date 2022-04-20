import { NextApiRequest, NextApiResponse } from "next";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { wordRequestStub } from "@models/word-request.stub";
import { like } from "@services/api/reactions";

import handler from "./like";

jest.mock("@services/api/reactions");
const likeMock = like as jest.MockedFunction<typeof like>;

describe("PUT", (): void => {
    const endMock = jest.fn();
    const jsonMock = jest.fn();
    const statusMock = jest.fn()
        .mockReturnValue({
            end: endMock,
            json: jsonMock
        });

    let reqStub: NextApiRequest = {
        method: Method.PUT
    } as Partial<NextApiRequest> as NextApiRequest;

    let resStub: NextApiResponse = {
        status: statusMock
    } as Partial<NextApiResponse> as NextApiResponse;

    beforeEach((): void => {
        jest.useFakeTimers();
        endMock.mockClear();
        statusMock.mockClear();

        reqStub = {
            method: Method.PUT,
            body: wordRequestStub
        } as Partial<NextApiRequest> as NextApiRequest;

        resStub = {
            status: statusMock
        } as Partial<NextApiResponse> as NextApiResponse;
    });

    afterEach((): void => {
        jest.useRealTimers();
    });

    it.skip("should add word", async (): Promise<void> => {
        likeMock.mockResolvedValue();

        await handler(reqStub, resStub);

        expect(statusMock).toHaveBeenCalledWith(Status.Created);
        expect(endMock).toHaveBeenCalled();
    });

    // TODO Investigate why this is working
    it.skip("should limit requests", async (): Promise<void> => {
        jest.setSystemTime(0);
        await handler(reqStub, resStub);
        await handler(reqStub, resStub);

        expect(statusMock).toHaveBeenCalledWith(Status.TooManyRequest);
        expect(endMock).toHaveBeenCalled();
    });

    it.skip("should not limit different user requests", async (): Promise<void> => {
        jest.setSystemTime(0);
        await handler(reqStub, resStub);
        const anotherReqStub: NextApiRequest = {
            ...reqStub,
            socket: {
                remoteAddress: "1.1.1.1"
            }
        } as Partial<NextApiRequest> as NextApiRequest;
        await handler(anotherReqStub, resStub);

        expect(statusMock).toHaveBeenCalledWith(Status.Created);
        expect(endMock).toHaveBeenCalled();
    });
});

describe.skip("DELETE", (): void => {
    jest.spyOn(console, "error")
        .mockImplementation();
});
