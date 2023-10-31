import { NextRequest, type NextResponse } from "next/server";

import { like } from "~/app/api/words/[id]/like/like";
import { removeLike } from "~/app/api/words/[id]/like/remove-like";
import { DELETE, PUT } from "~/app/api/words/[id]/like/route";
import { Status } from "~/types/status";
import { RateLimiter } from "~/utils/api/middlewares/rate-limiter";

jest.mock("~/app/api/words/[id]/like/like", () => ({
    like: jest.fn()
}));
const likeMock = like as jest.MockedFunction<typeof like>;
jest.mock("~/app/api/words/[id]/like/remove-like", () => ({
    removeLike: jest.fn()
}));
const removeLikeMock = removeLike as jest.MockedFunction<typeof removeLike>;

const consumeMock = jest.spyOn(RateLimiter.prototype, "consume");

const requestStub: NextRequest = new NextRequest(
    new URL("https://lexiquequebecois.com/api/words/gyu/dislike"),
    {
        ip: "127.0.0.1"
    }
);
const options = {
    params: {
        id: "gyu"
    }
};
const requestStubWithoutIp: NextRequest = new NextRequest(
    new URL("https://lexiquequebecois.com/api/words/gyu/dislike")
);

describe("PUT", (): void => {
    beforeEach((): void => {
        consumeMock.mockReturnValue(false);
    });

    afterEach((): void => {
        jest.resetAllMocks();
    });

    it("should not like with no ip", async (): Promise<void> => {
        const response: NextResponse = await PUT(requestStubWithoutIp, options);

        expect(response.status).toBe(Status.Unauthorized);
    });

    it("should limit request rate", async (): Promise<void> => {
        consumeMock.mockReturnValue(true);

        const response: NextResponse = await PUT(requestStub, options);

        expect(response.status).toBe(Status.TooManyRequest);
    });

    it("should not like non existent word", async (): Promise<void> => {
        likeMock.mockResolvedValue(Status.NotFound);

        const response: NextResponse = await PUT(requestStub, options);

        expect(response.status).toBe(Status.NotFound);
    });

    it("should not like already liked word", async (): Promise<void> => {
        likeMock.mockResolvedValue(Status.Conflict);

        const response: NextResponse = await PUT(requestStub, options);

        expect(response.status).toBe(Status.Conflict);
    });

    it("should like", async (): Promise<void> => {
        likeMock.mockResolvedValue(Status.OK);

        const response: NextResponse = await PUT(requestStub, options);

        expect(response.status).toBe(Status.OK);
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
        const response: NextResponse = await DELETE(requestStubWithoutIp, options);

        expect(response.status).toBe(Status.Unauthorized);
    });

    // TODO Find alternative so that tests are isolated for rate limiting
    it("should limit request rate", async (): Promise<void> => {
        consumeMock.mockReturnValue(true);

        const response: NextResponse = await DELETE(requestStub, options);

        expect(response.status).toBe(Status.TooManyRequest);
    });

    it("should not remove like on non existent word", async (): Promise<void> => {
        removeLikeMock.mockResolvedValue(Status.NotFound);

        const response: NextResponse = await DELETE(requestStub, options);

        expect(response.status).toBe(Status.NotFound);
    });

    it("should not remove non existent like", async (): Promise<void> => {
        removeLikeMock.mockResolvedValue(Status.Conflict);

        const response: NextResponse = await DELETE(requestStub, options);

        expect(response.status).toBe(Status.Conflict);
    });

    it("should remove like", async (): Promise<void> => {
        const response: NextResponse = await DELETE(requestStub, options);

        expect(response.status).toBe(Status.OK);
    });
});
