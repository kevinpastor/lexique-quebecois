import { isUserAgent } from "./isUserAgent";

export const isAndroid = (): boolean => (
    isUserAgent(/Android/)
);
