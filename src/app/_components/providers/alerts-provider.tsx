import { Alert as MuiAlert, type SnackbarProps } from "@mui/material";
import dynamic from "next/dynamic";
import { type ComponentType, type PropsWithChildren, type ReactNode, Suspense, type SyntheticEvent, createContext, useCallback, useEffect, useMemo } from "react";

import { type BooleanUtilities, useBoolean } from "~/hooks/use-boolean";
import { type QueueUtility, useQueue } from "~/hooks/use-queue";

export interface IAlertsContext {
    enqueueSuccessAlert: (message: string) => void;
    enqueueWarningAlert: (message: string) => void;
    enqueueErrorAlert: (message: string) => void;
}

export const AlertsContext = createContext<IAlertsContext | undefined>(undefined);
AlertsContext.displayName = "AlertsContext";

const LazySnackbar = dynamic((): Promise<{ default: ComponentType<SnackbarProps> }> => (
    import("@mui/material/Snackbar")
));

type Severity = "success" | "warning" | "error";

interface Alert {
    message: string;
    severity: Severity;
}

export const AlertsProvider = ({ children }: PropsWithChildren): ReactNode => {
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

    const enqueueWarningAlert = useCallback((message: string): void => {
        enqueueAlert({
            message,
            severity: "warning"
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
        enqueueWarningAlert,
        enqueueErrorAlert
    }), [enqueueErrorAlert, enqueueSuccessAlert, enqueueWarningAlert]);

    return (
        // TODO Investigate if the context provider can be moved in its own component.
        <AlertsContext.Provider value={value}>
            <Suspense>
                <LazySnackbar
                    open={isOpen}
                    onClose={handleClose}
                    TransitionProps={{ onExited: handleExited }}
                    autoHideDuration={5000}
                >
                    {/** TODO Look into why Alert can't be lazy loaded */}
                    <MuiAlert severity={alerts[0]?.severity}>
                        {alerts[0]?.message}
                    </MuiAlert>
                </LazySnackbar>
            </Suspense>
            {children}
        </AlertsContext.Provider>
    );
};
