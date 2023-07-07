import { createContext, PropsWithChildren, ReactElement, useContext, useMemo } from "react";

import { useLocalStorage } from "~/hooks/use-local-storage";

import { Consent } from "./consent";

interface IConsentContext {
    consent: Consent;
}
const ConsentContext = createContext<IConsentContext | undefined>(undefined);
ConsentContext.displayName = "ConsentContext";

export const ConsentContextProvider = ({ children }: PropsWithChildren): ReactElement => {
    const { value: consent } = useLocalStorage("consent", Consent.Pending);

    const value = useMemo((): IConsentContext => ({
        consent
    }), [consent]);

    return (
        <ConsentContext.Provider value={value}>
            {children}
        </ConsentContext.Provider>
    );
};

export const useConsent = (): IConsentContext => {
    const context = useContext(ConsentContext);

    if (context === undefined) {
        throw new Error("useConsent must be used within a ConsentProvider.");
    }

    return context;
};
