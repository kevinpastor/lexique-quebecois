import { Theme, useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

export const MobileOnly = ({ children }: PropsWithChildren<unknown>): ReactElement | null => {
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
