import { delay } from "@utils/misc/time";
import classNames from "classnames";
import { PropsWithChildren, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { Props as SnackbarProps, Snackbar } from ".";

import { SnackbarsContext, snackbarsContext } from "./snackbar-context";

export const Snackbars = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    const [snackbarsProps, setSnackbarsProps] = useState<Array<SnackbarProps>>([]);
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

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
        if (isMounted || snackbarsProps.length === 0) {
            return;
        }

        setIsMounted(true);
        setIsDisplayed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snackbarsProps]);

    // When the snackbar has been fully mounted, hide it after the timeout
    const handleEntered = async (): Promise<void> => {
        await delay(2500);
        setIsDisplayed(false);
    };

    // When the snackbar has been fully unmounted, remove the item from the list
    const handleExited = (): void => {
        setSnackbarsProps((oldProps: Array<SnackbarProps>): Array<SnackbarProps> => (
            oldProps.slice(1)
        ));
        setIsMounted(false);
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
