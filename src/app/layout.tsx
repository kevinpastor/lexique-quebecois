import { Metadata } from "next";
import { PropsWithChildren, ReactElement } from "react";

import { Layout } from "@components/layout";
import { metadata as meta } from "@configs/metadata";
import { Meta } from "@configs/metadata/meta";
import { Providers } from "@configs/providers";

export const metadata: Metadata = {
    title: "Lexique Québécois",
    manifest: "/manifest.json",
    viewport: {
        width: "device-width",
        initialScale: 1
    },
    description: "Un peu comme Urban Dictionary, mais québécois.",
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
    ]
};

const RootLayout = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <html lang="fr-CA">
        <head>
            {meta.map(({ name, content }: Meta): ReactElement => (
                <meta
                    key={name}
                    name={name}
                    content={content}
                />
            ))}
        </head>
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
