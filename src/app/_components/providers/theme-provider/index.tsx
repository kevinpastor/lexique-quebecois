import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider, getInitColorSchemeScript } from "@mui/material/styles";
import { type PropsWithChildren, type ReactElement } from "react";
import { NextAppDirEmotionCacheProvider, type NextAppDirEmotionCacheProviderProps } from "tss-react/next/appDir";

import { type ThemeMode } from "~/hooks/use-theme-mode";

import { theme } from "./theme";

const options: NextAppDirEmotionCacheProviderProps["options"] = { key: "css" };
const defaultMode: ThemeMode = "system";

export const ThemeProvider = ({ children }: PropsWithChildren): ReactElement => (
    // TODO Replace with the native Emotion cache provider when it will be available for /app.
    <NextAppDirEmotionCacheProvider options={options}>
        {getInitColorSchemeScript({ defaultMode })}
        <CssVarsProvider
            theme={theme}
            defaultMode={defaultMode}
            disableTransitionOnChange
        >
            <CssBaseline enableColorScheme />
            {children}
        </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
);
