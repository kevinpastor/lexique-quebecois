import { PropsWithChildren, ReactElement } from "react";

import { Content } from "./content";
import { Navigation } from "./navigation";
import { NoScript } from "./no-script";

export const Layout = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <>
        <NoScript />
        <Navigation />
        <Content>
            {children}
        </Content>
    </>
);
