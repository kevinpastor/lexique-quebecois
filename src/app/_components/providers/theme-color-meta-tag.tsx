import Head from "next/head";
import { ReactElement } from "react";

import { useThemeMode } from "@hooks/use-theme-mode";

export const ThemeColorMetaTag = (): ReactElement => {
    const { activeMode } = useThemeMode();

    return (
        <Head>
            <meta
                name="theme-color"
                content={activeMode === "dark" ? "#242424" : "#FFFFFF"}
            />
        </Head>
    );
};
