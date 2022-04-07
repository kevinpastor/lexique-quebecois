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
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
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
