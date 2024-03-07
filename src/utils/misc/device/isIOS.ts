import { isUserAgent } from "./isUserAgent";

export const isIOS = (): boolean => (
    isUserAgent(/iPad|iPhone|iPod/)
);
