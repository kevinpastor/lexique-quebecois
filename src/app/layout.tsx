import { PropsWithChildren, ReactElement } from "react";

import { Layout } from "@components/layout";
import { Providers } from "@configs/providers";

const RootLayout = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <html lang="fr-CA">
        <body>
            <Providers>
                <Layout>
                    {children}
                </Layout>
            </Providers>
        </body>
    </html>
);

export default RootLayout;
