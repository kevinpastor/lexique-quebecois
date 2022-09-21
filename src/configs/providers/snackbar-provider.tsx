import { CheckCircle, Error, Warning } from "@mui/icons-material";
import { Box } from "@mui/material";
import { SnackbarProvider as NotisackProvider } from "notistack";
import { PropsWithChildren, ReactElement } from "react";

export const SnackbarProvider = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <NotisackProvider
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
        {children}
    </NotisackProvider>
);
