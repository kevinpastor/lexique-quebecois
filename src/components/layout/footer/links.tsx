import { Link, Stack } from "@mui/material";
import NextLink from "next/link";
import { ReactElement } from "react";

export const Links = (): ReactElement => (
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
);
