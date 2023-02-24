import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider, getInitColorSchemeScript } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

import { theme } from "@configs/theme";

export const ThemeProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <>
        {getInitColorSchemeScript({ defaultMode: "system" })}
        <CssVarsProvider
            theme={theme}
            defaultMode="system"
        >
            <CssBaseline />
            {children}
        </CssVarsProvider>
    </>
);
