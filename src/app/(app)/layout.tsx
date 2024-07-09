import { type PropsWithChildren, type ReactNode } from "react";

import { Layout } from "./_components/layout";

const AppLayout = ({ children }: PropsWithChildren): ReactNode => (
    <Layout>
        {children}
    </Layout>
);

export default AppLayout;
