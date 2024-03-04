import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";

import { RateLimiter } from "~/utils/api/middlewares/rate-limiter";

describe("RateLimiter", (): void => {
    const window: number = 1000 * 60 * 15;
    const tokens: number = 1;
    const key: string = "foobar";

    beforeEach((): void => {
        jest.useFakeTimers();
    });

    afterEach((): void => {
        jest.useRealTimers();
    });

    describe("when first called", (): void => {
        it("should not limit", (): void => {
            const rateLimiter: RateLimiter = new RateLimiter(window, tokens);

            jest.setSystemTime(0);
            const isLimited: boolean = rateLimiter.consume(key);

            expect(isLimited).toBeFalsy();
        });
    });

    describe("when all tokens are used", (): void => {
        it("should limit", (): void => {
            const rateLimiter: RateLimiter = new RateLimiter(window, tokens);

            jest.setSystemTime(0);
            rateLimiter.consume(key);
            jest.setSystemTime(1);
            const isLimited: boolean = rateLimiter.consume(key);

            expect(isLimited).toBeTruthy();
        });
    });

    describe("when another key is provided", (): void => {
        it("should not limit", (): void => {
            const rateLimiter: RateLimiter = new RateLimiter(window, tokens);

            jest.setSystemTime(0);
            rateLimiter.consume(key);
            jest.setSystemTime(1);
            rateLimiter.consume(key);
            const isLimited: boolean = rateLimiter.consume("another-key");

            expect(isLimited).toBeFalsy();
        });
    });

    describe("when time window is passed", (): void => {
        it("should reset", (): void => {
            const rateLimiter: RateLimiter = new RateLimiter(1, tokens);

            jest.setSystemTime(0);
            rateLimiter.consume(key);
            jest.setSystemTime(2);
            const isLimited: boolean = rateLimiter.consume(key);

            expect(isLimited).toBeFalsy();
        });
    });
});
