import { isIOS } from "./isIOS";
import { isMacOS } from "./isMacOS";
import { isWindows } from "./isWindows";

export const isHighEndDevice = (): boolean => (
    isIOS() || isWindows() || isMacOS()
);
