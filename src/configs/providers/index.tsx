import { PropsWithChildren, ReactElement } from "react";

import { AdProvider } from "./ad-provider";
import { AlertsProvider } from "./alerts-provider";
import { ConsentProvider } from "./consent-provider";
import { SWRProvider } from "./swr-provider";
import { ThemeColorMetaTag } from "./theme-color-meta-tag";
import { ThemeProvider } from "./theme-provider";
import { TrackingProvider } from "./tracking-provider";

export const Providers = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <ThemeProvider>
        <ThemeColorMetaTag />
        <ConsentProvider>
            <TrackingProvider>
                <AdProvider />
                <AlertsProvider>
                    <SWRProvider>
                        {children}
                    </SWRProvider>
                </AlertsProvider>
            </TrackingProvider>
        </ConsentProvider>
    </ThemeProvider>
);
