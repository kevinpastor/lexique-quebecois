import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement } from "react";

import { Layout } from "@components/layout";
import { Providers } from "@configs/providers";
import "@configs/styles.css";

const App = ({ Component, pageProps }: AppProps): ReactElement => (
    <Providers>
        <Head>
            <title>Lexique Québécois</title>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
            />
            <link
                rel="icon"
                href="/favicon.ico"
            />
            <meta
                key="description"
                name="description"
                content="Un peu comme Urban Dictionary, mais québécois."
            />
        </Head>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </Providers>
);

export default App;
