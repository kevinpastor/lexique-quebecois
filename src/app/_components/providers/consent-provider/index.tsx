import { PropsWithChildren, ReactElement } from "react";

import { ConsentContextProvider } from "./context";
import { ConsentForm } from "./form";

export const ConsentProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <>
        <ConsentForm />
        <ConsentContextProvider>
            {children}
        </ConsentContextProvider>
    </>
);
