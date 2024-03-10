import { isHighEndDevice } from "./is-high-end-device";

export const isLowEndDevice = (): boolean => (
    !isHighEndDevice()
);
