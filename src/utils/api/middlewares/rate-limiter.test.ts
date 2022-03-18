import { createRateLimiter, RateLimiterMiddleware } from "./rate-limiter";

describe("@utils", (): void => {
    describe("api", (): void => {
        describe("middlewares", (): void => {
            describe("rate-limiter", (): void => {
                const window: number = 1000 * 60 * 15;
                const tokens: number = 1;
                const key: string = "foobar";

                it("should not limit initially", (): void => {
                    const rateLimiter: RateLimiterMiddleware = createRateLimiter(window, tokens);

                    const isLimited: boolean = rateLimiter(key);

                    expect(isLimited).toBeFalsy();
                });

                it("should limit after using all tokens", (): void => {
                    const rateLimiter: RateLimiterMiddleware = createRateLimiter(window, tokens);

                    rateLimiter(key);
                    const isLimited: boolean = rateLimiter(key);

                    expect(isLimited).toBeTruthy();
                });

                it("should not limit another key", (): void => {
                    const rateLimiter: RateLimiterMiddleware = createRateLimiter(window, tokens);

                    rateLimiter(key);
                    rateLimiter(key);
                    const isLimited: boolean = rateLimiter("another-key");

                    expect(isLimited).toBeFalsy();
                });

                it("should reset after window", (): void => {
                    const rateLimiter: RateLimiterMiddleware = createRateLimiter(0, tokens);

                    rateLimiter(key);
                    const isLimited: boolean = rateLimiter(key);

                    expect(isLimited).toBeFalsy();
                });
            });
        });
    });
});
