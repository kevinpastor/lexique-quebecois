import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement } from "react";

import { Layout } from "@components/layout";
import { Providers } from "@configs/providers";
import "@configs/styles.css";

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
        <Providers>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Providers>
    </>
);

export default App;
