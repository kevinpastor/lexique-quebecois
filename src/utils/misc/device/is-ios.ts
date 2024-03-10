import { isUserAgent } from "./is-user-agent";

export const isIOS = (): boolean => (
    isUserAgent(/iPad|iPhone|iPod/)
);
