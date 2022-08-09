import { Html, Head, Main, NextScript } from "next/document";
import { ReactElement } from "react";

import { metadata } from "@configs/metadata";
import { Meta } from "@configs/metadata/meta";

const Document = (): ReactElement => (
    <Html lang="fr">
        <Head>
            <link
                rel="icon"
                href="/favicon.ico"
                sizes="16x16"
            />
            <link
                rel="icon"
                href="/favicon-32.ico"
                sizes="32x32"
            />
            <link
                rel="icon"
                href="/favicon-128.ico"
                sizes="128x128"
            />
            <link
                rel="icon"
                href="/favicon-180.ico"
                sizes="180x180"
            />
            <link
                rel="icon"
                href="/favicon-192.ico"
                sizes="192x192"
            />
            <link
                rel="preconnect"
                href="https://fonts.googleapis.com"
            />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
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
