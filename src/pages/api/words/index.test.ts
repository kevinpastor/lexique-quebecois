import { Method } from "@models/method";
import { Status } from "@models/status";
import { NextApiRequest, NextApiResponse } from "next";
import handler from "./index";
import { addWord } from "@services/api/words";
import { wordRequestStub } from "@models/word-request.stub";
import { wordStub } from "@models/word.stub";

jest.mock("@services/api/words");
const addWordMock = addWord as jest.MockedFunction<typeof addWord>;

describe("@pages", (): void => {
    describe("api", (): void => {
        describe("words", (): void => {
            jest.spyOn(console, "error")
                .mockImplementation();

            const endMock = jest.fn();
            const jsonMock = jest.fn();
            const statusMock = jest.fn()
                .mockReturnValue({
                    end: endMock,
                    json: jsonMock
                });

            let reqStub: NextApiRequest = {
                method: Method.POST
            } as Partial<NextApiRequest> as NextApiRequest;

            let resStub: NextApiResponse = {
                status: statusMock
            } as Partial<NextApiResponse> as NextApiResponse;

            beforeEach((): void => {
                jest.useFakeTimers();
                endMock.mockClear();
                statusMock.mockClear();

                reqStub = {
                    method: Method.POST,
                    body: wordRequestStub
                } as Partial<NextApiRequest> as NextApiRequest;

                resStub = {
                    status: statusMock
                } as Partial<NextApiResponse> as NextApiResponse;
            });

            afterEach((): void => {
                jest.useRealTimers();
            });

            it("should not allow missing method", async (): Promise<void> => {
                reqStub.method = undefined;

                await handler(reqStub, resStub);

                expect(statusMock).toHaveBeenCalledWith(Status.BadRequest);
                expect(endMock).toHaveBeenCalled();
            });

            it("should not allow invalid method", async (): Promise<void> => {
                reqStub.method = "foo";

                await handler(reqStub, resStub);

                expect(statusMock).toHaveBeenCalledWith(Status.MethodNotAllowed);
                expect(endMock).toHaveBeenCalled();
            });

            it("should handle missing method handler", async (): Promise<void> => {
                reqStub.method = Method.GET;

                await handler(reqStub, resStub);

                expect(statusMock).toHaveBeenCalledWith(Status.MethodNotAllowed);
                expect(endMock).toHaveBeenCalled();
            });

            it("should not allow empty request", async (): Promise<void> => {
                reqStub.body = undefined;
                await handler(reqStub, resStub);

                expect(statusMock).toHaveBeenCalledWith(Status.BadRequest);
                expect(endMock).toHaveBeenCalled();
            });

            it("should not allow invalid request", async (): Promise<void> => {
                reqStub.body = {
                    label: "foo"
                };

                await handler(reqStub, resStub);

                expect(statusMock).toHaveBeenCalledWith(Status.BadRequest);
                expect(endMock).toHaveBeenCalled();
            });

            it("should handle errors", async (): Promise<void> => {
                addWordMock.mockRejectedValue(undefined);

                await handler(reqStub, resStub);

                expect(statusMock).toHaveBeenCalledWith(Status.InternalError);
                expect(endMock).toHaveBeenCalled();
            });

            it("should add word", async (): Promise<void> => {
                addWordMock.mockResolvedValue(wordStub);

                await handler(reqStub, resStub);

                expect(statusMock).toHaveBeenCalledWith(Status.Created);
                expect(jsonMock).toHaveBeenCalledWith(wordStub);
            });

            // TODO Investigate why this is working
            it("should limit requests", async (): Promise<void> => {
                jest.setSystemTime(0);
                await handler(reqStub, resStub);
                await handler(reqStub, resStub);

                expect(statusMock).toHaveBeenCalledWith(Status.TooManyRequest);
                expect(endMock).toHaveBeenCalled();
            });

            it("should not limit different user requests", async (): Promise<void> => {
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
    });
});
