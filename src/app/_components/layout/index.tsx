import { PropsWithChildren, ReactElement } from "react";

import { ConditionalLayout } from "./conditional-layout";
import { Content } from "./content";
import { Navigation } from "./navigation";
import { NoScript } from "./no-script";

export const Layout = ({ children }: PropsWithChildren): ReactElement => (
    <ConditionalLayout fallback={children}>
        <NoScript />
        <Navigation />
        <Content>
            {children}
        </Content>
    </ConditionalLayout>
);
