import { Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import { type ReactNode } from "react";

export const HomeButton = (): ReactNode => (
    <Button
        component={Link}
        href="/"
        startIcon={<Home />}
    >
        Accueil
    </Button>
);
