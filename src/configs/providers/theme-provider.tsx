import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

import { theme } from "@configs/theme";

export const ThemeProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <CssVarsProvider
        theme={theme}
        defaultMode="system"
    >
        <CssBaseline />
        {children}
    </CssVarsProvider>
);
