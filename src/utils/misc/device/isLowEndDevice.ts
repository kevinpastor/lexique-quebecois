import { isHighEndDevice } from "./isHighEndDevice";

export const isLowEndDevice = (): boolean => (
    !isHighEndDevice()
);
