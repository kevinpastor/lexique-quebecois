import { isUserAgent } from "./isUserAgent";

export const isWindows = (): boolean => (
    isUserAgent(/Windows NT/)
);
