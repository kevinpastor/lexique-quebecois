import { ReactElement } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "@configs/styles.css";

import { Footer } from "@components/layout/footer";
import { Navigation } from "@components/layout/navigation";
import { Sidebar } from "@components/layout/sidebar";
import { Snackbars } from "@components/misc/snackbar/snackbars";

const App = ({ Component, pageProps }: AppProps): ReactElement => (
    <Snackbars>
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
            <div className="flex gap-4">
                <div className="basis-full lg:basis-2/3 lg:space-y-0">
                    <Component {...pageProps} />
                </div>
                {/* 132px comes from the nav height (116px) and the main padding (16px). */}
                <div className="hidden lg:block sticky top-[132px] lg:basis-1/3 space-y-4 h-min">
                    <Sidebar />
                    <Footer />
                </div>
            </div>
            <div className="lg:hidden">
                <Footer />
            </div>
        </main>
    </Snackbars>
);

export default App;
