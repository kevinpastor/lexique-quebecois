import type { AlertProps, SnackbarProps } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, createContext, PropsWithChildren, ReactElement, Suspense, SyntheticEvent, useCallback, useEffect, useMemo } from "react";

import { BooleanUtilities, useBoolean } from "@utils/hooks/use-boolean";
import { QueueUtility, useQueue } from "@utils/hooks/use-queue";

export interface IAlertsContext {
    enqueueSuccessAlert: (message: string) => void;
    enqueueErrorAlert: (message: string) => void;
}

export const AlertsContext = createContext<IAlertsContext | null>(null);
AlertsContext.displayName = "AlertsContext";

const LazySnackbar = dynamic(
    (): Promise<{ default: ComponentType<SnackbarProps> }> => (
        import("@mui/material/Snackbar")
    ),
    { suspense: true }
);

const LazyAlert = dynamic(
    (): Promise<{ default: ComponentType<AlertProps> }> => (
        import("@mui/material/Alert")
    ),
    { suspense: true }
);

type Severity = "success" | "error";

interface Alert {
    message: string;
    severity: Severity;
}

export const AlertsProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    const {
        value: isOpen,
        setTrue: open,
        setFalse: close
    }: BooleanUtilities = useBoolean(false);
    const {
        value: isExited,
        setValue: setIsExited
    }: BooleanUtilities = useBoolean(true);
    const {
        queue: alerts,
        enqueue: enqueueAlert,
        dequeue: dequeueAlert
    }: QueueUtility<Alert> = useQueue<Alert>();

    useEffect((): void => {
        if (isExited && alerts.length >= 1) {
            open();
            setIsExited(false);
        }
    }, [alerts.length, isExited, open, setIsExited]);

    const handleClose = useCallback((_: SyntheticEvent | Event, reason: string): void => {
        if (reason === "timeout" || reason === "escapeKeyDown") {
            close();
        }
    }, [close]);

    const handleExited = useCallback((): void => {
        dequeueAlert();
        setIsExited(true);
    }, [dequeueAlert, setIsExited]);

    const enqueueSuccessAlert = useCallback((message: string): void => {
        enqueueAlert({
            message,
            severity: "success"
        });
    }, [enqueueAlert]);

    const enqueueErrorAlert = useCallback((message: string): void => {
        enqueueAlert({
            message,
            severity: "error"
        });
    }, [enqueueAlert]);

    const value: IAlertsContext = useMemo((): IAlertsContext => ({
        enqueueSuccessAlert,
        enqueueErrorAlert
    }), [enqueueErrorAlert, enqueueSuccessAlert]);

    return (
        <AlertsContext.Provider value={value}>
            <Suspense>
                <LazySnackbar
                    open={isOpen}
                    onClose={handleClose}
                    TransitionProps={{ onExited: handleExited }}
                    autoHideDuration={1500}
                >
                    <LazyAlert severity={alerts[0]?.severity}>
                        {alerts[0]?.message}
                    </LazyAlert>
                </LazySnackbar>
            </Suspense>
            {children}
        </AlertsContext.Provider>
    );
};
