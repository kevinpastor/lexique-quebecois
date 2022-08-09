import { CheckCircle, Error, Warning } from "@mui/icons-material";
import { Box } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { PropsWithChildren, ReactElement } from "react";
import { SWRConfig } from "swr";

import { fetcher } from "@services/fetcher";

import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <StyledEngineProvider injectFirst>
        <ThemeProvider>
            <SnackbarProvider
                iconVariant={{
                    success: (
                        <Box mr={1}>
                            <CheckCircle fontSize="small" />
                        </Box>
                    ),
                    warning: (
                        <Box mr={1}>
                            <Warning fontSize="small" />
                        </Box>
                    ),
                    error: (
                        <Box mr={1}>
                            <Error fontSize="small" />
                        </Box>
                    )
                }}
            >
                <SWRConfig value={{ fetcher }}>
                    {children}
                </SWRConfig>
            </SnackbarProvider>
        </ThemeProvider>
    </StyledEngineProvider>
);
