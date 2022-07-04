import classNames from "classnames";
import { PropsWithChildren, ReactElement, useMemo } from "react";

import { useBoolean } from "@utils/hooks/use-boolean";

import { IOverlayContext, OverlayContext } from "./context";

export const Overlay = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    const { value: isHidden, setTrue, setFalse } = useBoolean(true);

    const value: IOverlayContext = useMemo((): IOverlayContext => ({
        open: (): void => {
            setFalse();
        },
        close: (): void => {
            setTrue();
        }
    }), [setFalse, setTrue]);

    return (
        <OverlayContext.Provider value={value}>
            <div
                className={classNames(
                    // 56px comes from the nav height.
                    "w-full h-full bg-black/50 fixed top-[56px] left-0 z-20",
                    {
                        "hidden": isHidden
                    }
                )}
            />
            {children}
        </OverlayContext.Provider>
    );
};
