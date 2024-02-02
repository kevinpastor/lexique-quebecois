import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider, getInitColorSchemeScript } from "@mui/material/styles";
import { AppRouterCacheProvider, type AppRouterCacheProviderProps } from "@mui/material-nextjs/v13-appRouter";
import { type PropsWithChildren, type ReactElement } from "react";

import { type ThemeMode } from "~/hooks/use-theme-mode";

import { theme } from "./theme";

const options: AppRouterCacheProviderProps["options"] = { key: "css" };
const defaultMode: ThemeMode = "system";

export const ThemeProvider = ({ children }: PropsWithChildren): ReactElement => (
    <AppRouterCacheProvider options={options}>
        {getInitColorSchemeScript({ defaultMode })}
        <CssVarsProvider
            theme={theme}
            defaultMode={defaultMode}
            disableTransitionOnChange
        >
            <CssBaseline enableColorScheme />
            {children}
        </CssVarsProvider>
    </AppRouterCacheProvider>
);
