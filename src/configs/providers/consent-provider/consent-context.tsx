import { createContext, useContext } from "react";

import { Consent } from "./consent";

export interface IConsentContext {
    consent: Consent;
}
export const ConsentContext = createContext<IConsentContext | null>(null);

export const useConsent = (): IConsentContext => {
    const context = useContext(ConsentContext);

    if (!context) {
        throw new Error("useConsent must be used within a ConsentProvider");
    }

    return context;
};
