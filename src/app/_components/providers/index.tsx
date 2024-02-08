"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type PropsWithChildren, type ReactNode } from "react";
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

export const Providers = ({ children }: PropsWithChildren): ReactNode => (
    <>
        <Analytics />
        <SpeedInsights />
        <PlatformNameProvider>
            <AnimationProvider>
                {/* <TransitionProvider> */}
                <HelmetProvider>
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
    </>
);
