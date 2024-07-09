import { type PropsWithChildren, type ReactNode } from "react";

import { Content } from "./content";
import { Navigation } from "./navigation";
import { NoScript } from "./no-script";

export const Layout = ({ children }: PropsWithChildren): ReactNode => (
    <>
        <NoScript />
        <Navigation />
        <Content>
            {children}
        </Content>
    </>
);
