import { headers } from "next/headers";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Status } from "~/types/status";
import { RateLimiter } from "~/utils/api/middlewares/rate-limiter";

import { dislike } from "./dislike";
import { dislikeAction } from ".";

vi.mock("next/headers", () => ({
    headers: vi.fn()
}));

vi.mock("./dislike", () => ({
    dislike: vi.fn()
}));

const consumeMock = vi.spyOn(RateLimiter.prototype, "consume");

describe("dislikeAction", (): void => {
    beforeEach((): void => {
        consumeMock.mockReturnValue(false);
    });

    describe("when no ip is available", (): void => {
        beforeEach((): void => {
            vi.mocked(headers).mockReturnValue(new Headers());
        });

        it("should not dislike", async (): Promise<void> => {
            const result: Status = await dislikeAction("gyu");

            expect(result).toBe(Status.Unauthorized);
        });
    });

    describe("when an ip is available", (): void => {
        beforeEach((): void => {
            vi.mocked(headers).mockReturnValue(new Headers({ "x-client-ip": "0.0.0.0" }));
        });

        it("should limit request rate", async (): Promise<void> => {
            consumeMock.mockReturnValue(true);

            const result: Status = await dislikeAction("gyu");

            expect(result).toBe(Status.TooManyRequest);
        });

        it("should not dislike non existent word", async (): Promise<void> => {
            vi.mocked(dislike).mockResolvedValue(Status.NotFound);

            const result: Status = await dislikeAction("gyu");

            expect(result).toBe(Status.NotFound);
        });

        it("should not dislike already disliked word", async (): Promise<void> => {
            vi.mocked(dislike).mockResolvedValue(Status.Conflict);

            const result: Status = await dislikeAction("gyu");

            expect(result).toBe(Status.Conflict);
        });

        it("should dislike", async (): Promise<void> => {
            vi.mocked(dislike).mockResolvedValue(Status.OK);

            const result: Status = await dislikeAction("gyu");

            expect(result).toBe(Status.OK);
        });
    });
});
