import { useContext } from "react";

import { AlertsContext, type IAlertsContext } from "~/app/_components/providers/alerts-provider";

export const useAlerts = (): IAlertsContext => {
    const context = useContext(AlertsContext);

    if (context === undefined) {
        throw new Error("useAlerts must be used within a SnackbarProvider.");
    }

    return context;
};
