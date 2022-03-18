export type RateLimiterMiddleware = (key: string) => boolean;

export const createRateLimiter = (window: number, tokens: number): RateLimiterMiddleware => {
    const cache = new Map<string, Array<Date>>();

    return (key: string): boolean => {
        if (!cache.has(key)) {
            cache.set(key, []);
        }

        const now: Date = new Date();
        const timestamps: Array<Date> = cache.get(key) as Array<Date>;
        if (timestamps.length < tokens) {
            timestamps.push(now);
            return false;
        }

        while (timestamps.length > 0) {
            const elapsedTime: number = now.getTime() - timestamps[0].getTime();
            if (elapsedTime <= window) {
                break;
            }
            timestamps.shift();
        }

        if (timestamps.length < tokens) {
            timestamps.push(now);
            return false;
        }

        return true;
    };
};
