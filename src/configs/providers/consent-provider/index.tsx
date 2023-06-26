import { PropsWithChildren, ReactElement, useMemo } from "react";

import { ConsentForm } from "./consent-form";
import { ConsentContextProvider } from "./consent-context-provider";

export const ConsentProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <>
        <ConsentForm />
        <ConsentContextProvider>
            {children}
        </ConsentContextProvider>
    </>
);
