import { isUserAgent } from "./is-user-agent";

export const isMacOS = (): boolean => (
    isUserAgent(/Macintosh/)
);
