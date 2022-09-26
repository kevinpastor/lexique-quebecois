import { Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { ReactElement } from "react";

import { DesktopOnly } from "@components/misc/desktop-only";

import { Theme } from "./navigation/menu/theme";

export const Footer = (): ReactElement => (
    <Stack
        component="footer"
        spacing={1}
    >
        <DesktopOnly>
            <Theme />
        </DesktopOnly>
        <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
        >
            <Typography variant="subtitle2">
                <NextLink
                    href="/conditions"
                    passHref
                >
                    <Link
                        variant="subtitle2"
                        color="inherit"
                        underline="hover"
                    >
                        Conditions
                    </Link>
                </NextLink>
            </Typography>
            <Typography variant="subtitle2">
                <NextLink
                    href="/confidentialite"
                    passHref
                >
                    <Link
                        variant="subtitle2"
                        color="inherit"
                        underline="hover"
                    >
                        Confidentialité
                    </Link>
                </NextLink>
            </Typography>
        </Stack>
        <Typography
            align="center"
            variant="subtitle2"
        >
            &copy; 2022 Lexique Québécois
        </Typography>
    </Stack>
);
