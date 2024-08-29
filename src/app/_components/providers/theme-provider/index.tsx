import { CssBaseline } from "@mui/material";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider, type AppRouterCacheProviderProps } from "@mui/material-nextjs/v13-appRouter";
import { type PropsWithChildren, type ReactNode } from "react";

import { colorSchemeSelector, theme } from "./theme";

const options: AppRouterCacheProviderProps["options"] = { key: "css" };

export const ThemeProvider = ({ children }: PropsWithChildren): ReactNode => (
    <AppRouterCacheProvider options={options}>
        <InitColorSchemeScript attribute={colorSchemeSelector} />
        <MuiThemeProvider
            theme={theme}
            disableTransitionOnChange
        >
            <CssBaseline enableColorScheme />
            {children}
        </MuiThemeProvider>
    </AppRouterCacheProvider>
);
