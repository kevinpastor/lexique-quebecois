import { Html, Head, Main, NextScript } from "next/document";
import { ReactElement } from "react";

import { metadata } from "@configs/metadata";
import { Meta } from "@configs/metadata/meta";

const Document = (): ReactElement => (
    <Html
        lang="fr"
        className="h-full bg-slate-900"
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
            {metadata.map(({ name, content }: Meta): ReactElement => (
                <meta
                    key={name}
                    name={name}
                    content={content}
                />
            ))}
        </Head>
        <body className="h-full text-slate-100">
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;
