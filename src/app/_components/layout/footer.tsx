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
