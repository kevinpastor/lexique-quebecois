import { ReactElement } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "@styles/index.css";

import { Footer, Navigation, Sidebar } from "@components/layout";

const App = ({ Component, pageProps }: AppProps): ReactElement => (
    <>
        <Head>
            <title>Lexique Québécois</title>
            <meta
                name="description"
                content="Un peu comme le Urban Dictionnary, mais québécois"
            />
            <link
                rel="icon"
                href="/favicon.ico"
            />
        </Head>
        <Navigation />
        <main className="container mx-auto p-4 space-y-4">
            <div className="flex flex-row gap-4">
                <div className="basis-full lg:basis-2/3 lg:space-y-0">
                    <Component
                        {...pageProps}
                    />
                </div>
                <div className="hidden lg:block lg:basis-1/3 space-y-4">
                    <Sidebar />
                    <Footer />
                </div>
            </div>
            <div className="lg:hidden">
                <Footer />
            </div>
        </main>
    </>
);

export default App;
