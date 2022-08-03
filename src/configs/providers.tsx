import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { CheckCircle, Error, Warning } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { PropsWithChildren, ReactElement } from "react";
import { SWRConfig } from "swr";

import { theme } from "@configs/theme";
import { fetcher } from "@services/fetcher";

config.autoAddCss = false;

export const Providers = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <ThemeProvider theme={theme}>
        <SnackbarProvider
            iconVariant={{
                success: (
                    <div className="mr-2">
                        <CheckCircle fontSize="small" />
                    </div>
                ),
                warning: (
                    <div className="mr-2">
                        <Warning fontSize="small" />
                    </div>
                ),
                error: (
                    <div className="mr-2">
                        <Error fontSize="small" />
                    </div>
                )
            }}
        >
            <SWRConfig value={{ fetcher }}>
                {children}
            </SWRConfig>
        </SnackbarProvider>
    </ThemeProvider>
);
