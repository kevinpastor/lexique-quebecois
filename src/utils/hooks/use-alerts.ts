import { useContext } from "react";

import { AlertsContext, IAlertsContext } from "@configs/providers/alerts-provider";

export const useAlerts = (): IAlertsContext => {
    const context = useContext(AlertsContext);
    if (!context) {
        throw new Error("useAlerts must be used within a SnackbarProvider.");
    }
    return context;
};
