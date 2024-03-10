import { isAndroid } from "./is-android";
import { isIOS } from "./is-ios";

export const isMobile = (): boolean => (
    isIOS() || isAndroid()
);
