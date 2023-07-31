import { PropsWithChildren, ReactElement } from "react";

import { Layout } from "./_components/layout";

const RootLayout = ({ children }: PropsWithChildren): ReactElement => (
    <Layout>
        {children}
    </Layout>
);

export default RootLayout;
