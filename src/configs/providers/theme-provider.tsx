import { CssBaseline, Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { PropsWithChildren, ReactElement, useMemo } from "react";

import { getTheme } from "@configs/theme";
import { useDarkMode } from "@utils/hooks/use-dark-mode";

export const ThemeProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => {
    const { mode } = useDarkMode();

    const theme = useMemo((): Theme => (
        getTheme(mode)
    ), [mode]);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};
