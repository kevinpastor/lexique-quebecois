"use client";

import { Theme, useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren, ReactElement, Suspense } from "react";

export const DesktopOnly = ({ children }: PropsWithChildren<unknown>): ReactElement | null => {
    const theme: Theme = useTheme();
    const matches: boolean = useMediaQuery(theme.breakpoints.up("md"));

    if (!matches) {
        return null;
    }

    return (
        <Suspense>
            {children}
        </Suspense>
    );
};
