import { ReactElement } from "react";
import { Html, Head, Main, NextScript } from "next/document";

const Document = (): ReactElement => (
    <Html lang="fr">
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
                href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@100;200;300;400;500;600;700;800;900&display=swap"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
            />
            <link
                rel="apple-touch-icon"
                href="/icons/apple-touch-icon.png"
            />
            <link
                rel="manifest"
                href="/manifest.json"
            />
            <meta
                name="theme-color"
                content="#1E293B"
            />
            <meta
                name="application-name"
                content="Lexique Québécois"
            />
            <meta
                name="apple-mobile-web-app-capable"
                content="yes"
            />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="default"
            />
            <meta
                name="apple-mobile-web-app-title"
                content="Lexique Québécois"
            />
            <meta
                name="description"
                content="Un peu comme Urban Dictionary, mais québécois."
            />
            <meta
                property="og:type"
                content="website"
            />
            <meta
                property="og:title"
                content="Lexique Québécois"
            />
            <meta
                property="og:description"
                content="Un peu comme Urban Dictionary, mais québécois."
            />
            <meta
                property="og:site_name"
                content="Lexique Québécois"
            />
            {/*
            <meta
                property="og:url"
                content="https://yourdomain.com"
            />
            <meta
                property="og:image"
                content="https://yourdomain.com/icons/apple-touch-icon.png"
            />
            */}
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;
