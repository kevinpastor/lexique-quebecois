import { Link, Stack } from "@mui/material";
import NextLink from "next/link";
import { ReactElement } from "react";

export const Links = (): ReactElement => (
    <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
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
);
