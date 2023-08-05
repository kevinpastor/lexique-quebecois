"use client";

import { Analytics } from "@vercel/analytics/react";
import { type PropsWithChildren, type ReactElement } from "react";
import { HelmetProvider } from "react-helmet-async";

import { AdProvider } from "./ad-provider";
import { AlertsProvider } from "./alerts-provider";
import { AnimationProvider } from "./animation-provider";
import { ConsentProvider } from "./consent-provider";
import { PlatformNameProvider } from "./platform-provider";
import { SWRProvider } from "./swr-provider";
import { ThemeColorMetaTag } from "./theme-color-meta-tag";
import { ThemeProvider } from "./theme-provider";
// import { TransitionProvider } from "./transition-provider";

export const Providers = ({ children }: PropsWithChildren): ReactElement => (
    <PlatformNameProvider>
        <AnimationProvider>
            {/* <TransitionProvider> */}
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
            {/* </TransitionProvider> */}
        </AnimationProvider>
    </PlatformNameProvider>
);
