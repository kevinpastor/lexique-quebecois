"use client";

import { useMediaQuery } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { PropsWithChildren, ReactElement, Suspense } from "react";

export const DesktopOnly = ({ children }: PropsWithChildren): ReactElement | null => {
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
