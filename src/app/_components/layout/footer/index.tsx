import { Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, ReactElement } from "react";

import { DesktopOnly } from "~/components/desktop-only";

const LazyLinks = dynamic(async (): Promise<{ default: ComponentType }> => ({
    default: (await import("./links")).Links
}));

export const Footer = (): ReactElement => (
    <Stack
        component="footer"
        spacing={1}
    >
        <DesktopOnly>
            <LazyLinks />
        </DesktopOnly>
        <Typography
            align="center"
            variant="subtitle2"
        >
            &copy; 2023 Lexique Québécois
        </Typography>
    </Stack>
);
