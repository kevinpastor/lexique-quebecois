import { RateLimiter } from "~/utils/api/middlewares/rate-limiter";

const window: number = 1000 * 60 * 15;
const tokens: number = 100;
export const rateLimiter = new RateLimiter(window, tokens);
