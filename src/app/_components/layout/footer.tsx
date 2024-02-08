import { Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { type ReactNode } from "react";

export const Footer = (): ReactNode => (
    <Stack
        component="footer"
        spacing={{
            xs: 0,
            md: 1
        }}
    >
        <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{
                display: {
                    xs: "none",
                    md: "inherit"
                }
            }}
        >
            <Link
                component={NextLink}
                href="/conditions"
                variant="subtitle2"
                color="default"
                underline="hover"
            >
                Conditions
            </Link>
            <Link
                component={NextLink}
                href="/confidentialite"
                variant="subtitle2"
                color="default"
                underline="hover"
            >
                Confidentialité
            </Link>
        </Stack>
        <Typography
            align="center"
            variant="subtitle2"
        >
            &copy; 2023 Lexique Québécois
        </Typography>
    </Stack>
);
