import { ReactElement } from "react";
import { Helmet } from "react-helmet";

import { useThemeMode } from "~/hooks/use-theme-mode";

export const ThemeColorMetaTag = (): ReactElement => {
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
