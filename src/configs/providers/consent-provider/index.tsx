import { PropsWithChildren, ReactElement, useMemo } from "react";

import { useLocalStorage } from "@utils/hooks/use-local-storage";

import { Consent } from "./consent";
import { IConsentContext, ConsentContext } from "./consent-context";
import { ConsentForm } from "./consent-form";

export const ConsentProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    const { value: consent } = useLocalStorage("consent", Consent.Pending);

    const value = useMemo((): IConsentContext => ({
        consent
    }), [consent]);

    return (
        <>
            <ConsentForm />
            <ConsentContext.Provider value={value}>
                {children}
            </ConsentContext.Provider>
        </>
    );
};
