import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { NextRequest, type NextResponse } from "next/server";

import * as dislikeModule from "~/app/api/words/[id]/dislike/dislike";
import * as removeDislikeModule from "~/app/api/words/[id]/dislike/remove-dislike";
import { DELETE, PUT } from "~/app/api/words/[id]/dislike/route";
import { Status } from "~/types/status";
import { RateLimiter } from "~/utils/api/middlewares/rate-limiter";

jest.mock("~/app/api/words/[id]/dislike/dislike", () => ({
    dislike: jest.fn()
}));

const { dislike: dislikeMock } = dislikeModule as jest.Mocked<typeof dislikeModule>;
jest.mock("~/app/api/words/[id]/dislike/remove-dislike", () => ({
    removeDislike: jest.fn()
}));
const { removeDislike: removeDislikeMock } = removeDislikeModule as jest.Mocked<typeof removeDislikeModule>;

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

    it("should not dislike with no ip", async (): Promise<void> => {
        const response: NextResponse = await PUT(requestStubWithoutIp, options);

        expect(response.status).toBe(Status.Unauthorized);
    });

    it("should limit request rate", async (): Promise<void> => {
        consumeMock.mockReturnValue(true);

        const response: NextResponse = await PUT(requestStub, options);

        expect(response.status).toBe(Status.TooManyRequest);
    });

    it("should not dislike non existent word", async (): Promise<void> => {
        dislikeMock.mockResolvedValue(Status.NotFound);

        const response: NextResponse = await PUT(requestStub, options);

        expect(response.status).toBe(Status.NotFound);
    });

    it("should not dislike already disliked word", async (): Promise<void> => {
        dislikeMock.mockResolvedValue(Status.Conflict);

        const response: NextResponse = await PUT(requestStub, options);

        expect(response.status).toBe(Status.Conflict);
    });

    it("should dislike", async (): Promise<void> => {
        dislikeMock.mockResolvedValue(Status.OK);

        const response: NextResponse = await PUT(requestStub, options);

        expect(response.status).toBe(Status.OK);
    });
});

describe("DELETE", (): void => {
    beforeEach((): void => {
        consumeMock.mockReturnValue(false);
    });

    afterEach((): void => {
        jest.resetAllMocks();
    });

    it("should not remove dislike with no ip", async (): Promise<void> => {
        const response: NextResponse = await DELETE(requestStubWithoutIp, options);

        expect(response.status).toBe(Status.Unauthorized);
    });

    it("should limit request rate", async (): Promise<void> => {
        consumeMock.mockReturnValue(true);

        const response: NextResponse = await DELETE(requestStub, options);

        expect(response.status).toBe(Status.TooManyRequest);
    });

    it("should not remove dislike on non existent word", async (): Promise<void> => {
        removeDislikeMock.mockResolvedValue(Status.NotFound);

        const response: NextResponse = await DELETE(requestStub, options);

        expect(response.status).toBe(Status.NotFound);
    });

    it("should not remove non existent dislike", async (): Promise<void> => {
        removeDislikeMock.mockResolvedValue(Status.Conflict);

        const response: NextResponse = await DELETE(requestStub, options);

        expect(response.status).toBe(Status.Conflict);
    });

    it("should remove dislike", async (): Promise<void> => {
        removeDislikeMock.mockResolvedValue(Status.OK);

        const response: NextResponse = await DELETE(requestStub, options);

        expect(response.status).toBe(Status.OK);
    });
});
