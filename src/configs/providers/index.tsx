import { PropsWithChildren, ReactElement } from "react";

import { AdProvider } from "./ad-provider";
import { AlertsProvider } from "./alerts-provider";
import { SWRProvider } from "./swr-provider";
import { ThemeColorMetaTag } from "./theme-color-meta-tag";
import { ThemeProvider } from "./theme-provider";
import { TrackingProvider } from "./tracking-provider";

export const Providers = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <TrackingProvider>
        <AdProvider />
        <ThemeProvider>
            <ThemeColorMetaTag />
            <AlertsProvider>
                <SWRProvider>
                    {children}
                </SWRProvider>
            </AlertsProvider>
        </ThemeProvider>
    </TrackingProvider>
);
