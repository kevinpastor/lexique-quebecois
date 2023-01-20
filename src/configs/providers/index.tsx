import { PropsWithChildren, ReactElement } from "react";

import { AdProvider } from "./ad-provider";
import { AlertsProvider } from "./alerts-provider";
import { SWRProvider } from "./swr-provider";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <AdProvider>
        <ThemeProvider>
            <AlertsProvider>
                <SWRProvider>
                    {children}
                </SWRProvider>
            </AlertsProvider>
        </ThemeProvider>
    </AdProvider>
);
