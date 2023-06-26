import { PropsWithChildren, ReactElement } from "react";

import { ConsentContextProvider } from "./consent-context-provider";
import { ConsentForm } from "./consent-form";

export const ConsentProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <>
        <ConsentForm />
        <ConsentContextProvider>
            {children}
        </ConsentContextProvider>
    </>
);
