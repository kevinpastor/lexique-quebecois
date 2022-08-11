import { ScopedCssBaseline, Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { PropsWithChildren, ReactElement, useMemo } from "react";

import { getTheme } from "@configs/theme";
import { useDarkMode } from "@utils/hooks/use-dark-mode";

export const ThemeProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    const { mode } = useDarkMode();

    const lightTheme: Theme = useMemo((): Theme => (
        getTheme("light")
    ), []);
    const darkTheme: Theme = useMemo((): Theme => (
        getTheme("dark")
    ), []);
    const theme = useMemo((): Theme => (
        mode === "light" ? lightTheme : darkTheme
    ), [mode, lightTheme, darkTheme]);

    return (
        <MuiThemeProvider theme={theme}>
            <ScopedCssBaseline>
                {children}
            </ScopedCssBaseline>
        </MuiThemeProvider>
    );
};
