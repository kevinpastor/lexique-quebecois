import { NextRequest, type NextResponse } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { dislike } from "~/app/api/words/[id]/dislike/dislike";
import { removeDislike } from "~/app/api/words/[id]/dislike/remove-dislike";
import { DELETE, PUT } from "~/app/api/words/[id]/dislike/route";
import { Status } from "~/types/status";
import { RateLimiter } from "~/utils/api/middlewares/rate-limiter";

vi.mock("~/app/api/words/[id]/dislike/dislike", () => ({
    dislike: vi.fn()
}));

vi.mock("~/app/api/words/[id]/dislike/remove-dislike", () => ({
    removeDislike: vi.fn()
}));

const consumeMock = vi.spyOn(RateLimiter.prototype, "consume");

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
        vi.mocked(dislike).mockResolvedValue(Status.NotFound);

        const response: NextResponse = await PUT(requestStub, options);

        expect(response.status).toBe(Status.NotFound);
    });

    it("should not dislike already disliked word", async (): Promise<void> => {
        vi.mocked(dislike).mockResolvedValue(Status.Conflict);

        const response: NextResponse = await PUT(requestStub, options);

        expect(response.status).toBe(Status.Conflict);
    });

    it("should dislike", async (): Promise<void> => {
        vi.mocked(dislike).mockResolvedValue(Status.OK);

        const response: NextResponse = await PUT(requestStub, options);

        expect(response.status).toBe(Status.OK);
    });
});

describe("DELETE", (): void => {
    beforeEach((): void => {
        consumeMock.mockReturnValue(false);
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
        vi.mocked(removeDislike).mockResolvedValue(Status.NotFound);

        const response: NextResponse = await DELETE(requestStub, options);

        expect(response.status).toBe(Status.NotFound);
    });

    it("should not remove non existent dislike", async (): Promise<void> => {
        vi.mocked(removeDislike).mockResolvedValue(Status.Conflict);

        const response: NextResponse = await DELETE(requestStub, options);

        expect(response.status).toBe(Status.Conflict);
    });

    it("should remove dislike", async (): Promise<void> => {
        vi.mocked(removeDislike).mockResolvedValue(Status.OK);

        const response: NextResponse = await DELETE(requestStub, options);

        expect(response.status).toBe(Status.OK);
    });
});
