import { PropsWithChildren, ReactElement } from "react";

import { SnackbarProvider } from "./snackbar-provider";
import { SWRProvider } from "./swr-provider";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <ThemeProvider>
        <SnackbarProvider>
            <SWRProvider>
                {children}
            </SWRProvider>
        </SnackbarProvider>
    </ThemeProvider>
);
