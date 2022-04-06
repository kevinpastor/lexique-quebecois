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

            let resStub: NextApiResponse = {
                status: statusMock
            } as Partial<NextApiResponse> as NextApiResponse;

            let reqStub: NextApiRequest = {
                method: Method.POST
            } as Partial<NextApiRequest> as NextApiRequest;

            beforeEach((): void => {
                jest.useFakeTimers();
                endMock.mockClear();
                statusMock.mockClear();

                resStub = {
                    status: statusMock
                } as Partial<NextApiResponse> as NextApiResponse;

                reqStub = {
                    method: Method.POST
                } as Partial<NextApiRequest> as NextApiRequest;
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
                reqStub.body = wordRequestStub;
                addWordMock.mockRejectedValue(undefined);

                await handler(reqStub, resStub);

                expect(statusMock).toHaveBeenCalledWith(Status.InternalError);
                expect(endMock).toHaveBeenCalled();
            });

            it("should add word", async (): Promise<void> => {
                reqStub.body = wordRequestStub;
                addWordMock.mockResolvedValue(wordStub);

                await handler(reqStub, resStub);

                expect(statusMock).toHaveBeenCalledWith(Status.Created);
                expect(jsonMock).toHaveBeenCalledWith(wordStub);
            });

            it("should limit requests", async (): Promise<void> => {
                await handler(reqStub, resStub);
                await handler(reqStub, resStub);

                expect(statusMock).toHaveBeenCalledWith(Status.TooManyRequest);
                expect(endMock).toHaveBeenCalled();
            });

            it.skip("should not limit different user requests", async (): Promise<void> => {
                jest.setSystemTime(0);
                const anotherReqStub: NextApiRequest = {
                    ...reqStub,
                    socket: {
                        remoteAddress: "1.1.1.1"
                    }
                } as Partial<NextApiRequest> as NextApiRequest;
                await handler(reqStub, resStub);
                await handler(anotherReqStub, resStub);

                expect(statusMock).toHaveBeenCalledWith(Status.Created);
                expect(endMock).toHaveBeenCalled();
            });
        });
    });
});
