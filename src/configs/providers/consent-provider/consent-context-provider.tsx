import { PropsWithChildren, ReactElement, useMemo } from "react";

import { useLocalStorage } from "@utils/hooks/use-local-storage";

import { Consent } from "./consent";
import { IConsentContext, ConsentContext } from "./consent-context";

export const ConsentContextProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => {
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
