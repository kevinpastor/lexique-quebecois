import { headers } from "next/headers";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { removeLike } from "~/components/definition/reactions/use-reactions/actions/remove-like-action/remove-like";
import { Status } from "~/types/status";
import { RateLimiter } from "~/utils/api/middlewares/rate-limiter";

import { removeLikeAction } from ".";

vi.mock("next/headers", () => ({
    headers: vi.fn()
}));

vi.mock("./remove-like", () => ({
    removeLike: vi.fn()
}));

const consumeMock = vi.spyOn(RateLimiter.prototype, "consume");

describe("removeLikeAction", (): void => {
    beforeEach((): void => {
        consumeMock.mockReturnValue(false);
    });

    describe("when no ip is available", (): void => {
        beforeEach((): void => {
            vi.mocked(headers).mockReturnValue(new Headers());
        });

        it("should not remove like", async (): Promise<void> => {
            const result: Status = await removeLikeAction("gyu");

            expect(result).toBe(Status.Unauthorized);
        });
    });

    describe("when an ip is available", (): void => {
        beforeEach((): void => {
            vi.mocked(headers).mockReturnValue(new Headers({ "x-client-ip": "0.0.0.0" }));
        });

        // TODO Find alternative so that tests are isolated for rate limiting
        it("should limit request rate", async (): Promise<void> => {
            consumeMock.mockReturnValue(true);

            const result: Status = await removeLikeAction("gyu");

            expect(result).toBe(Status.TooManyRequest);
        });

        it("should not remove like on non existent word", async (): Promise<void> => {
            vi.mocked(removeLike).mockResolvedValue(Status.NotFound);

            const result: Status = await removeLikeAction("gyu");

            expect(result).toBe(Status.NotFound);
        });

        it("should not remove non existent like", async (): Promise<void> => {
            vi.mocked(removeLike).mockResolvedValue(Status.Conflict);

            const result: Status = await removeLikeAction("gyu");

            expect(result).toBe(Status.Conflict);
        });

        it("should remove like", async (): Promise<void> => {
            vi.mocked(removeLike).mockResolvedValue(Status.OK);

            const result: Status = await removeLikeAction("gyu");

            expect(result).toBe(Status.OK);
        });
    });
});
