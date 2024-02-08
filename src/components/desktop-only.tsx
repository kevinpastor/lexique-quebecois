"use client";

import { useMediaQuery } from "@mui/material";
import { type Theme, useTheme } from "@mui/material/styles";
import { type PropsWithChildren, type ReactNode, Suspense } from "react";

export const DesktopOnly = ({ children }: PropsWithChildren): ReactNode => {
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
