import { isAndroid } from "./isAndroid";
import { isIOS } from "./isIOS";

export const isMobile = (): boolean => (
    isIOS() || isAndroid()
);
