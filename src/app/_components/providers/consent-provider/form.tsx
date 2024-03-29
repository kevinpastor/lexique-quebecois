import dynamic from "next/dynamic";
import { type ComponentType, type ReactNode, Suspense } from "react";

import { useLocalStorage } from "~/hooks/use-local-storage";

import { Consent } from "./consent";
import { type ConsentSnackbarProps } from "./snackbar";

const LazyConsentSnackbar = dynamic(async (): Promise<{ default: ComponentType<ConsentSnackbarProps> }> => ({
    default: (await import("./snackbar")).ConsentSnackbar
}));

export const ConsentForm = (): ReactNode => {
    const {
        value: consent,
        setValue: setConsent,
        isSynced
    } = useLocalStorage("consent", Consent.Pending);

    const isOpen: boolean = isSynced && consent === Consent.Pending;

    const handleAccept = (): void => {
        setConsent(Consent.Accepted);
    };

    const handleRefuse = (): void => {
        setConsent(Consent.Refused);
    };

    return (
        <Suspense>
            <LazyConsentSnackbar
                isOpen={isOpen}
                onAccept={handleAccept}
                onRefuse={handleRefuse}
            />
        </Suspense>
    );
};
