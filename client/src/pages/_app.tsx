import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement } from "react";

import "@styles/index.css";

import { Navigation } from "@components/navigation";
import { Sidebar } from "@components/sidebar";
import { MobileFooter } from "@components/mobile-footer";
import { MobileCard } from "@components/mobile-card";

const App = ({ Component, pageProps }: AppProps): ReactElement => (
    <>
        <Head>
            <title>Québécois Urbain</title>
            <meta name="description" content="Un peu comme le Urban Dictionnary, mais québécois" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navigation />
        <main className="container mx-auto p-4">
            <div className="flex flex-row space-x-4">
                <div className="lg:basis-2/3 basis-full space-y-4 lg:space-y-0">
                    <div className="lg:hidden">
                        <MobileCard />
                    </div>
                    <Component {...pageProps} />
                </div>
                <div className="lg:basis-1/3 hidden lg:block">
                    <Sidebar />
                </div>
            </div>
            <footer className="lg:hidden">
                <MobileFooter />
            </footer>
        </main>
    </>
);

export default App;
