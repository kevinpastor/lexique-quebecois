import { isUserAgent } from "./isUserAgent";

export const isMacOS = (): boolean => (
    isUserAgent(/Macintosh/)
);
