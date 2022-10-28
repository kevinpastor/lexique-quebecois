import { Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { ReactElement } from "react";

export const Footer = (): ReactElement => (
    <Stack
        component="footer"
        spacing={1}
    >
        <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
        >
            <NextLink
                href="/conditions"
                passHref
                legacyBehavior
            >
                <Link
                    variant="subtitle2"
                    color="default"
                    underline="hover"
                >
                    Conditions
                </Link>
            </NextLink>
            <NextLink
                href="/confidentialite"
                passHref
                legacyBehavior
            >
                <Link
                    variant="subtitle2"
                    color="default"
                    underline="hover"
                >
                    Confidentialité
                </Link>
            </NextLink>
        </Stack>
        <Typography
            align="center"
            variant="subtitle2"
        >
            &copy; 2022 Lexique Québécois
        </Typography>
    </Stack>
);
