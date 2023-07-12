"use client";

import { useMediaQuery } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { PropsWithChildren, ReactElement } from "react";

export const MobileOnly = ({ children }: PropsWithChildren): ReactElement | null => {
    const theme: Theme = useTheme();
    const matches: boolean = useMediaQuery(theme.breakpoints.down("md"), { defaultMatches: true });

    if (!matches) {
        return null;
    }

    return (
        <>
            {children}
        </>
    );
};
