import { type ReactNode } from "react";
import { Helmet } from "react-helmet-async";

import { useThemeMode } from "~/hooks/use-theme-mode";

export const ThemeColorMetaTag = (): ReactNode => {
    const { activeMode } = useThemeMode();

    return (
        <Helmet>
            <meta
                name="theme-color"
                content={activeMode === "dark" ? "#242424" : "#FFFFFF"}
            />
        </Helmet>
    );
};
