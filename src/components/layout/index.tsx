import { Container } from "@mui/material";
import classNames from "classnames";
import { PropsWithChildren, ReactElement } from "react";

import { Footer } from "@components/layout/footer";
import { Navigation } from "@components/layout/navigation";
import { Sidebar } from "@components/layout/sidebar";
import { Loading } from "@components/misc/loading";
import { useScrollingDirection } from "@utils/hooks/use-scrolling-direction";

export const Layout = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    const { isScrollingUp } = useScrollingDirection();

    return (
        <>
            <Navigation />
            <Container>
                <main className="pt-2 pb-4 space-y-4">
                    <div className="flex gap-4">
                        <div className="basis-full lg:basis-2/3 lg:space-y-0">
                            <Loading>
                                {children}
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
            </Container>

        </>
    );
};
