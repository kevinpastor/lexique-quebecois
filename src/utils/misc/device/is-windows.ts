import { isUserAgent } from "./is-user-agent";

export const isWindows = (): boolean => (
    isUserAgent(/Windows NT/)
);
