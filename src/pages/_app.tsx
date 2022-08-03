import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeProvider } from "@mui/material";
import classNames from "classnames";
import { AppProps } from "next/app";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import { ReactElement } from "react";
import { SWRConfig } from "swr";

import { Footer } from "@components/layout/footer";
import { Navigation } from "@components/layout/navigation";
import { Sidebar } from "@components/layout/sidebar";
import { Loading } from "@components/misc/loading";
import "@configs/styles.css";
import { theme } from "@configs/theme";
import { fetcher } from "@services/fetcher";
import { useScrollingDirection } from "@utils/hooks/use-scrolling-direction";

config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps): ReactElement => {
    const { isScrollingUp } = useScrollingDirection();

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
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
                <Navigation />
                <main className="container mx-auto px-4 pt-2 pb-4 space-y-2">
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
                                    // 64px comes from the nav height (56px) and the top main padding (8px).
                                    "top-[64px]": isScrollingUp,
                                    // 8px comes from the bottom main padding (8px).
                                    "top-2": !isScrollingUp
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
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
