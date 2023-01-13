import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { ReactElement } from "react";

import { Layout } from "@components/layout";
import { setupClassNameGenerator } from "@configs/mui-class-name-setup";
import { Providers } from "@configs/providers";

setupClassNameGenerator();

declare global {
    interface Window {
        adsbygoogle?: Array<unknown>;
    }
}

const App = ({ Component, pageProps }: AppProps): ReactElement => (
    <>
        <Head>
            <title>Lexique Québécois</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta
                key="description"
                name="description"
                content="Un peu comme Urban Dictionary, mais québécois."
            />
        </Head>
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3996014859104973"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
        <Providers>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Providers>
    </>
);

export default App;
