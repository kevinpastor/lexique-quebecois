import { createContext } from "react";

export interface IOverlayContext {
    open: () => void;
    close: () => void;
}

export const OverlayContext = createContext<IOverlayContext>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    open: () => { },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    close: (): void => { }
});

OverlayContext.displayName = "OverlayContext";
