import { isMobile } from "./is-mobile";

export const isDesktop = (): boolean => (
    !isMobile()
);
