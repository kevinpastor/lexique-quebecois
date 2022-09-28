import type { AlertProps, SnackbarProps } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, createContext, PropsWithChildren, ReactElement, Suspense, SyntheticEvent, useCallback, useMemo, useState } from "react";

import { useBoolean } from "@utils/hooks/use-boolean";

export interface IAlertsContext {
    enqueueSuccessAlert: (message: string) => void;
    enqueueErrorAlert: (message: string) => void;
}

export const AlertsContext = createContext<IAlertsContext | null>(null);

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
    const { value: isOpen, setTrue: open, setFalse: close } = useBoolean(false);
    const [alerts, setAlerts] = useState<ReadonlyArray<Alert>>([]);

    const enqueueAlert = useCallback((severity: Severity) => (message: string): void => {
        setAlerts((prevState: ReadonlyArray<Alert>): ReadonlyArray<Alert> => ([
            ...prevState,
            {
                message,
                severity
            }
        ]));

        if (alerts.length === 0) {
            open();
        }
    }, [alerts.length, open]);

    const enqueueSuccessAlert = useCallback((message: string): void => {
        enqueueAlert("success")(message);
    }, [enqueueAlert]);

    const enqueueErrorAlert = useCallback((message: string): void => {
        enqueueAlert("error")(message);
    }, [enqueueAlert]);

    const value = useMemo((): IAlertsContext => ({
        enqueueSuccessAlert,
        enqueueErrorAlert
    }), [enqueueErrorAlert, enqueueSuccessAlert]);

    const handleClose = useCallback((_: SyntheticEvent | Event, reason: string): void => {
        if (reason !== "timeout" && reason !== "escapeKeyDown") {
            return;
        }
        close();
    }, [close]);

    const handleExited = useCallback((): void => {
        setAlerts((prevState: ReadonlyArray<Alert>): ReadonlyArray<Alert> => (
            prevState.slice(1)
        ));

        if (alerts.length > 1) {
            open();
        }
    }, [alerts.length, open]);

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
