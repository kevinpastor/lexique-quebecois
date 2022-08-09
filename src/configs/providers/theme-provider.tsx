import { CssBaseline, PaletteMode, Theme, ThemeProvider as MuiThemeProvider, useMediaQuery } from "@mui/material";
import { PropsWithChildren, ReactElement, useMemo } from "react";
import { useTernaryDarkMode } from "usehooks-ts";

import { getTheme } from "@configs/theme";

export type TernaryDarkMode = "system" | "light" | "dark";

export const ThemeProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    const { ternaryDarkMode } = useTernaryDarkMode();
    const prefersDarkMode: boolean = useMediaQuery("(prefers-color-scheme: dark)");
    const paletteMode: PaletteMode = ternaryDarkMode === "system"
        ? prefersDarkMode
            ? "dark"
            : "light"
        : ternaryDarkMode;

    const theme = useMemo((): Theme => (
        getTheme(paletteMode)
    ), [paletteMode]);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};
