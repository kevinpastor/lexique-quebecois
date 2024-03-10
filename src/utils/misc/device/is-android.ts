import { isUserAgent } from "./is-user-agent";

export const isAndroid = (): boolean => (
    isUserAgent(/Android/)
);
