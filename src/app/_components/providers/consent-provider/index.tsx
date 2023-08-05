import { type PropsWithChildren, type ReactElement } from "react";

import { ConsentContextProvider } from "./context";
import { ConsentForm } from "./form";

export const ConsentProvider = ({ children }: PropsWithChildren): ReactElement => (
    <>
        <ConsentForm />
        <ConsentContextProvider>
            {children}
        </ConsentContextProvider>
    </>
);
