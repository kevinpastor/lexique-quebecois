import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement } from "react";

import { Snackbar } from "@components/feedback/snackbar";
import { Snackbars } from "@components/feedback/snackbar/snackbars";
import { Footer } from "@components/layout/footer";
import { Navigation } from "@components/layout/navigation";
import { Sidebar } from "@components/layout/sidebar";
import { Variant } from "@components/variant";
import "@configs/styles.css";

config.autoAddCss = false;

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
        <noscript>
            <Snackbar
                label="Ce site web requiert que JavaScript soit activé pour fonctionner correctement."
                variant={Variant.Error}
            />
        </noscript>
    </Snackbars>
);

export default App;
