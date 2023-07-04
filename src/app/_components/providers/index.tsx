"use client";

import { Analytics } from "@vercel/analytics/react";
import { PropsWithChildren, ReactElement } from "react";

import { AdProvider } from "./ad-provider";
import { AlertsProvider } from "./alerts-provider";
import { AuthenticationProvider, AuthenticationProviderProps } from "./authentication-provider";
import { ConsentProvider } from "./consent-provider";
import { SWRProvider } from "./swr-provider";
import { ThemeColorMetaTag } from "./theme-color-meta-tag";
import { ThemeProvider } from "./theme-provider";

type Props = AuthenticationProviderProps;

export const Providers = ({ session, children }: PropsWithChildren<Props>): ReactElement => (
    <>
        <Analytics />
        <AuthenticationProvider session={session}>
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
        </AuthenticationProvider>
    </>
);
