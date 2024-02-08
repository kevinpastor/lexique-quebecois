import { type PropsWithChildren, type ReactNode } from "react";

import { ConsentContextProvider } from "./context";
import { ConsentForm } from "./form";

export const ConsentProvider = ({ children }: PropsWithChildren): ReactNode => (
    <>
        <ConsentForm />
        <ConsentContextProvider>
            {children}
        </ConsentContextProvider>
    </>
);
