import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider, getInitColorSchemeScript } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

import { theme } from "@configs/theme";
import { ThemeMode } from "@utils/hooks/use-theme-mode";

const defaultMode: ThemeMode = "system";

export const ThemeProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <>
        {getInitColorSchemeScript({ defaultMode })}
        <CssVarsProvider
            theme={theme}
            defaultMode={defaultMode}
            disableTransitionOnChange
        >
            <CssBaseline enableColorScheme />
            {children}
        </CssVarsProvider>
    </>
);
