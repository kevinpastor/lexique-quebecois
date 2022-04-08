import classNames from "classnames";
import { PropsWithChildren, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { Transition, TransitionStatus } from "react-transition-group";

import { useBoolean } from "@utils/hooks/use-boolean";
import { delay } from "@utils/misc/time";

import { Props as SnackbarProps, Snackbar } from ".";
import { SnackbarsContext, snackbarsContext } from "./snackbar-context";

export const Snackbars = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    const [snackbarsProps, setSnackbarsProps] = useState<Array<SnackbarProps>>([]);
    const {
        value: isDisplayed,
        setFalse: setIsDisplayedFalse,
        setTrue: setIsDisplayedTrue
    } = useBoolean(false);
    const {
        value: isSnackbarMounted,
        setFalse: setIsSnackbarMountedFalse,
        setTrue: setIsSnackbarMountedTrue
    } = useBoolean(false);

    const value: SnackbarsContext = useMemo((): SnackbarsContext => ({
        snackbarsProps: snackbarsProps,
        push: (snackbarProps: SnackbarProps): void => {
            setSnackbarsProps((oldProps: Array<SnackbarProps>): Array<SnackbarProps> => ([
                ...oldProps,
                snackbarProps
            ]));
        }
    }), [snackbarsProps]);

    useEffect((): void => {
        if (isSnackbarMounted || snackbarsProps.length === 0) {
            return;
        }

        setIsSnackbarMountedTrue();
        setIsDisplayedTrue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snackbarsProps]);

    // When the snackbar has been fully mounted, hide it after the timeout
    const handleEntered = async (): Promise<void> => {
        await delay(2500);
        setIsDisplayedFalse();
    };

    // When the snackbar has been fully unmounted, remove the item from the list
    const handleExited = (): void => {
        setSnackbarsProps((oldProps: Array<SnackbarProps>): Array<SnackbarProps> => (
            oldProps.slice(1)
        ));
        setIsSnackbarMountedFalse();
    };

    // TODO https://github.com/reactjs/react-transition-group/issues/668
    const ref = useRef(null);

    return (
        <snackbarsContext.Provider value={value}>
            {children}
            <Transition
                in={isDisplayed}
                timeout={150}
                onEntered={handleEntered}
                onExited={handleExited}
                nodeRef={ref}
            >
                {(status: TransitionStatus): ReactElement | null => (
                    status === "exited"
                        ? null
                        : (
                            <div
                                ref={ref}
                                className={classNames({
                                    "animate-fade-in": status === "entering",
                                    "animate-fade-out": status === "exiting"
                                })}
                            >
                                <Snackbar {...snackbarsProps[0]} />
                            </div>
                        )
                )}
            </Transition>
        </snackbarsContext.Provider>
    );
};
