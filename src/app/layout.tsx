import { Metadata } from "next";
import { PropsWithChildren, ReactElement } from "react";

import { Layout } from "./_components/layout";
import { Providers } from "./_components/providers";

export const metadata: Metadata = {
    title: {
        default: "Lexique Québécois",
        template: "%s - Lexique Québécois"
    },
    description: "Un peu comme Urban Dictionary, mais tokébakicitte.",
    applicationName: "Lexique Québécois",
    metadataBase: new URL("https://lexiquequebecois.com/"),
    openGraph: {
        title: "Lexique Québécois",
        description: "Un peu comme Urban Dictionary, mais tokébakicitte.",
        url: "https://lexiquequebecois.com/",
        siteName: "Lexique Québécois",
        locale: "fr_CA",
        type: "website"
    },
    icons: [
        {
            url: "/favicon/light/16.ico",
            sizes: "16x16",
            media: "(prefers-color-scheme: light)"
        },
        {
            url: "/favicon/light/32.ico",
            sizes: "32x32",
            media: "(prefers-color-scheme: light)"
        },
        {
            url: "/favicon/light/128.ico",
            sizes: "128x128",
            media: "(prefers-color-scheme: light)"
        },
        {
            url: "/favicon/light/180.ico",
            sizes: "180x180",
            media: "(prefers-color-scheme: light)"
        },
        {
            url: "/favicon/light/192.ico",
            sizes: "192x192",
            media: "(prefers-color-scheme: light)"
        },
        {
            url: "/favicon/dark/16.ico",
            sizes: "16x16",
            media: "(prefers-color-scheme: dark)"
        },
        {
            url: "/favicon/dark/32.ico",
            sizes: "32x32",
            media: "(prefers-color-scheme: dark)"
        },
        {
            url: "/favicon/dark/128.ico",
            sizes: "128x128",
            media: "(prefers-color-scheme: dark)"
        },
        {
            url: "/favicon/dark/180.ico",
            sizes: "180x180",
            media: "(prefers-color-scheme: dark)"
        },
        {
            url: "/favicon/dark/192.ico",
            sizes: "192x192",
            media: "(prefers-color-scheme: dark)"
        }
    ],
    manifest: "/manifest.json",
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 10
    },
    appleWebApp: {
        title: "Lexique Québécois",
        statusBarStyle: "default"
    }
};

const RootLayout = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <html
        lang="fr-CA"
        suppressHydrationWarning // Removes the hydration error: "Extra attributes from the server: data-mui-color-scheme".
    >
        <body>
            <Providers>
                <Layout>
                    {children}
                </Layout>
            </Providers>
        </body>
    </html>
);

export default RootLayout;
