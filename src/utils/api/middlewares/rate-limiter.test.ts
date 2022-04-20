import { RateLimiter } from "./rate-limiter";

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

    it("should not limit initially", (): void => {
        const rateLimiter: RateLimiter = new RateLimiter(window, tokens);

        jest.setSystemTime(0);
        const isLimited: boolean = rateLimiter.consume(key);

        expect(isLimited).toBeFalsy();
    });

    it("should limit after using all tokens", (): void => {
        const rateLimiter: RateLimiter = new RateLimiter(window, tokens);

        jest.setSystemTime(0);
        rateLimiter.consume(key);
        jest.setSystemTime(1);
        const isLimited: boolean = rateLimiter.consume(key);

        expect(isLimited).toBeTruthy();
    });

    it("should not limit another key", (): void => {
        const rateLimiter: RateLimiter = new RateLimiter(window, tokens);

        jest.setSystemTime(0);
        rateLimiter.consume(key);
        jest.setSystemTime(1);
        rateLimiter.consume(key);
        const isLimited: boolean = rateLimiter.consume("another-key");

        expect(isLimited).toBeFalsy();
    });

    it("should reset after window", (): void => {
        const rateLimiter: RateLimiter = new RateLimiter(1, tokens);

        jest.setSystemTime(0);
        rateLimiter.consume(key);
        jest.setSystemTime(2);
        const isLimited: boolean = rateLimiter.consume(key);

        expect(isLimited).toBeFalsy();
    });
});
