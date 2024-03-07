import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { RateLimiter } from "~/utils/api/middlewares/rate-limiter";

describe("RateLimiter", (): void => {
    const window: number = 1000 * 60 * 15;
    const tokens: number = 1;
    const key: string = "foobar";

    beforeEach((): void => {
        vi.useFakeTimers();
    });

    afterEach((): void => {
        vi.useRealTimers();
    });

    describe("when first called", (): void => {
        it("should not limit", (): void => {
            const rateLimiter: RateLimiter = new RateLimiter(window, tokens);

            vi.setSystemTime(0);
            const isLimited: boolean = rateLimiter.consume(key);

            expect(isLimited).toBeFalsy();
        });
    });

    describe("when all tokens are used", (): void => {
        it("should limit", (): void => {
            const rateLimiter: RateLimiter = new RateLimiter(window, tokens);

            vi.setSystemTime(0);
            rateLimiter.consume(key);
            vi.setSystemTime(1);
            const isLimited: boolean = rateLimiter.consume(key);

            expect(isLimited).toBeTruthy();
        });
    });

    describe("when another key is provided", (): void => {
        it("should not limit", (): void => {
            const rateLimiter: RateLimiter = new RateLimiter(window, tokens);

            vi.setSystemTime(0);
            rateLimiter.consume(key);
            vi.setSystemTime(1);
            rateLimiter.consume(key);
            const isLimited: boolean = rateLimiter.consume("another-key");

            expect(isLimited).toBeFalsy();
        });
    });

    describe("when time window is passed", (): void => {
        it("should reset", (): void => {
            const rateLimiter: RateLimiter = new RateLimiter(1, tokens);

            vi.setSystemTime(0);
            rateLimiter.consume(key);
            vi.setSystemTime(2);
            const isLimited: boolean = rateLimiter.consume(key);

            expect(isLimited).toBeFalsy();
        });
    });
});
