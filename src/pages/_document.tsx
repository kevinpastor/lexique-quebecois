import { Html, Head, Main, NextScript } from "next/document";
import { ReactElement } from "react";

import { metadata } from "@configs/metadata";
import { Meta } from "@configs/metadata/meta";

const Document = (): ReactElement => (
    <Html
        lang="fr"
        className="h-full bg-white"
    >
        <Head>
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
        <body className="h-full text-black/[.87] font-serif">
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;
