import { isIOS } from "./is-ios";
import { isMacOS } from "./is-mac-os";
import { isWindows } from "./is-windows";

export const isHighEndDevice = (): boolean => (
    isIOS() || isWindows() || isMacOS()
);
