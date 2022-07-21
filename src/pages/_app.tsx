import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import classNames from "classnames";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement } from "react";
import { SWRConfig } from "swr";

import { Snackbar } from "@components/feedback/snackbar";
import { Snackbars } from "@components/feedback/snackbar/snackbars";
import { Footer } from "@components/layout/footer";
import { Navigation } from "@components/layout/navigation";
import { Overlay } from "@components/layout/overlay";
import { Sidebar } from "@components/layout/sidebar";
import { Loading } from "@components/misc/loading";
import { Variant } from "@components/variant";
import "@configs/styles.css";
import { fetcher } from "@services/fetcher";
import { useScrollingDirection } from "@utils/hooks/use-scrolling-direction";

config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps): ReactElement => {
    const { isScrollingUp } = useScrollingDirection();

    return (
        <Snackbars>
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
            <Overlay>
                <Navigation />
                <main className="container mx-auto px-0 space-y-4">
                    <div className="flex gap-4">
                        <div className="basis-full lg:basis-2/3 lg:space-y-0">
                            <Loading>
                                <SWRConfig value={{ fetcher }}>
                                    <Component {...pageProps} />
                                </SWRConfig>
                            </Loading>
                        </div>
                        <div
                            className={classNames(
                                "hidden lg:block sticky lg:basis-1/3 space-y-4 h-min transition-all",
                                {
                                    // 72px comes from the nav height (56px) and the main padding (16px).
                                    "top-[72px]": isScrollingUp,
                                    "top-4": !isScrollingUp
                                }
                            )}
                        >
                            <Sidebar />
                            <Footer />
                        </div>
                    </div>
                    <div className="lg:hidden">
                        <Footer />
                    </div>
                </main>
            </Overlay>
            <noscript>
                <Snackbar
                    label="Ce site web requiert que JavaScript soit activé pour fonctionner correctement."
                    variant={Variant.Error}
                />
            </noscript>
        </Snackbars>
    );
};

export default App;
