import { Method } from "@models/method";
import { Status } from "@models/status";
import { NextApiRequest, NextApiResponse } from "next";
import { createHandler, Handler } from "./index";
import { MethodHandlers } from "./method-handlers";

describe("@utils", (): void => {
    describe("api", (): void => {
        describe("handler", (): void => {
            describe("createHandler", (): void => {
                jest.spyOn(console, "error")
                    .mockImplementation();

                const endMock = jest.fn();
                const statusMock = jest.fn()
                    .mockReturnValue({ end: endMock });

                let reqStub: NextApiRequest = {
                    method: Method.GET
                } as Partial<NextApiRequest> as NextApiRequest;

                let resStub: NextApiResponse = {
                    status: statusMock
                } as Partial<NextApiResponse> as NextApiResponse;

                beforeEach((): void => {
                    endMock.mockClear();
                    statusMock.mockClear();

                    reqStub = {
                        method: Method.GET
                    } as Partial<NextApiRequest> as NextApiRequest;

                    resStub = {
                        status: statusMock
                    } as Partial<NextApiResponse> as NextApiResponse;
                });

                it("should not allow missing method", async (): Promise<void> => {
                    const methodHandlers: MethodHandlers = {};
                    const handler: Handler = createHandler(methodHandlers);

                    reqStub.method = undefined;

                    await handler(reqStub, resStub);

                    expect(statusMock).toHaveBeenCalledWith(Status.BadRequest);
                    expect(endMock).toHaveBeenCalled();
                });

                it("should not allow invalid method", async (): Promise<void> => {
                    const methodHandlers: MethodHandlers = {};
                    const handler: Handler = createHandler(methodHandlers);

                    reqStub.method = "foo";

                    await handler(reqStub, resStub);

                    expect(statusMock).toHaveBeenCalledWith(Status.MethodNotAllowed);
                    expect(endMock).toHaveBeenCalled();
                });

                it("should handle missing method handler", async (): Promise<void> => {
                    const methodHandlers: MethodHandlers = {};
                    const handler: Handler = createHandler(methodHandlers);

                    await handler(reqStub, resStub);

                    expect(statusMock).toHaveBeenCalledWith(Status.MethodNotAllowed);
                    expect(endMock).toHaveBeenCalled();
                });

                it("should handle errors", async (): Promise<void> => {
                    const methodHandlers: MethodHandlers = {
                        [Method.GET]: (): Promise<void> => {
                            throw new Error();
                        }
                    };
                    const handler: Handler = createHandler(methodHandlers);

                    await handler(reqStub, resStub);

                    expect(statusMock).toHaveBeenCalledWith(Status.InternalError);
                    expect(endMock).toHaveBeenCalled();
                });

                it("should handle", async (): Promise<void> => {
                    const methodHandler = jest.fn()
                        .mockImplementation((_: NextApiRequest, res: NextApiResponse): void => {
                            res.status(Status.OK)
                                .end();
                        });
                    const methodHandlers: MethodHandlers = {
                        [Method.GET]: methodHandler
                    };
                    const handler: Handler = createHandler(methodHandlers);

                    await handler(reqStub, resStub);

                    expect(methodHandler).toHaveBeenCalled();
                    expect(statusMock).toHaveBeenCalledWith(Status.OK);
                    expect(endMock).toHaveBeenCalled();
                });
            });
        });
    });
});
