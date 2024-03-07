import { isMobile } from "./isMobile";

export const isDesktop = (): boolean => (
    !isMobile()
);
