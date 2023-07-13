"use client";

import { Analytics } from "@vercel/analytics/react";
import { PropsWithChildren, ReactElement } from "react";
import { HelmetProvider } from "react-helmet-async";

import { AdProvider } from "./ad-provider";
import { AlertsProvider } from "./alerts-provider";
import { ConsentProvider } from "./consent-provider";
import { SWRProvider } from "./swr-provider";
import { ThemeColorMetaTag } from "./theme-color-meta-tag";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: PropsWithChildren): ReactElement => (
    <HelmetProvider>
        <Analytics />
        <ThemeProvider>
            <ThemeColorMetaTag />
            <ConsentProvider>
                <AdProvider />
                <AlertsProvider>
                    <SWRProvider>
                        {children}
                    </SWRProvider>
                </AlertsProvider>
            </ConsentProvider>
        </ThemeProvider>
    </HelmetProvider>
);
