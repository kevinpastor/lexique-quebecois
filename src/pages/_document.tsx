import { Html, Head, Main, NextScript } from "next/document";
import { ReactElement } from "react";

import { metadata } from "@configs/metadata";
import { Meta } from "@configs/metadata/meta";

const Document = (): ReactElement => (
    <Html lang="fr">
        <Head>
            <link
                rel="icon"
                href="/favicon/light/16.ico"
                sizes="16x16"
                media="(prefers-color-scheme: light)"
            />
            <link
                rel="icon"
                href="/favicon/light/32.ico"
                sizes="32x32"
                media="(prefers-color-scheme: light)"
            />
            <link
                rel="icon"
                href="/favicon/light/128.ico"
                sizes="128x128"
                media="(prefers-color-scheme: light)"
            />
            <link
                rel="icon"
                href="/favicon/light/180.ico"
                sizes="180x180"
                media="(prefers-color-scheme: light)"
            />
            <link
                rel="icon"
                href="/favicon/light/192.ico"
                sizes="192x192"
                media="(prefers-color-scheme: light)"
            />
            <link
                rel="icon"
                href="/favicon/dark/16.ico"
                sizes="16x16"
                media="(prefers-color-scheme: dark)"
            />
            <link
                rel="icon"
                href="/favicon/dark/32.ico"
                sizes="32x32"
                media="(prefers-color-scheme: dark)"
            />
            <link
                rel="icon"
                href="/favicon/dark/128.ico"
                sizes="128x128"
                media="(prefers-color-scheme: dark)"
            />
            <link
                rel="icon"
                href="/favicon/dark/180.ico"
                sizes="180x180"
                media="(prefers-color-scheme: dark)"
            />
            <link
                rel="icon"
                href="/favicon/dark/192.ico"
                sizes="192x192"
                media="(prefers-color-scheme: dark)"
            />
            <link
                rel="manifest"
                href="/manifest.json"
            />
            <link
                rel="preconnect"
                href="https://fonts.googleapis.com"
            />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
            />
            {metadata.map(({ name, content }: Meta): ReactElement => (
                <meta
                    key={name}
                    name={name}
                    content={content}
                />
            ))}
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;
