export class RateLimiter {
    private readonly cache: Map<string, Array<Date>>;

    public constructor(
        private readonly window: number,
        private readonly tokens: number
    ) {
        this.cache = new Map<string, Array<Date>>();
    }

    public consume(key: string): boolean {
        if (!this.cache.has(key)) {
            this.cache.set(key, []);
        }

        const now: Date = new Date();
        const timestamps: Array<Date> = this.cache.get(key) as Array<Date>;
        if (timestamps.length < this.tokens) {
            timestamps.push(now);
            return false;
        }

        while (timestamps[0] !== undefined) {
            const elapsedTime: number = now.getTime() - timestamps[0].getTime();
            if (elapsedTime <= this.window) {
                break;
            }
            timestamps.shift();
        }

        if (timestamps.length >= this.tokens) {
            return true;
        }

        timestamps.push(now);
        return false;
    }
}
