import { Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import { type ReactElement } from "react";

export const HomeButton = (): ReactElement => (
    <Button
        component={Link}
        href="/"
        startIcon={<Home />}
    >
        Accueil
    </Button>
);
