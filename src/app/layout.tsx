import { type Metadata, type Viewport } from "next";
import { type PropsWithChildren, type ReactNode } from "react";

import { Providers } from "./_components/providers";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 10
};

export const metadata: Metadata = {
    title: {
        default: "Lexique Québécois",
        template: "%s - Lexique Québécois"
    },
    description: "Un peu comme Urban Dictionary, mais tokébakicitte.",
    applicationName: "Lexique Québécois",
    metadataBase: new URL("https://lexiquequebecois.com/"),
    openGraph: {
        title: "Lexique Québécois",
        description: "Un peu comme Urban Dictionary, mais tokébakicitte.",
        url: "https://lexiquequebecois.com/",
        siteName: "Lexique Québécois",
        locale: "fr_CA",
        type: "website"
    },
    appleWebApp: {
        title: "Lexique Québécois",
        statusBarStyle: "default"
    }
};

const RootLayout = ({ children }: PropsWithChildren): ReactNode => (
    <html
        lang="fr-CA"
        suppressHydrationWarning // Removes the hydration error: "Extra attributes from the server: data-mui-color-scheme".
    >
        <body>
            <Providers>
                {children}
            </Providers>
        </body>
    </html>
);

export default RootLayout;
