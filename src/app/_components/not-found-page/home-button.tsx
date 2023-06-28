import { Button } from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";

import { HomeIcon } from "./home-icon";

export const HomeButton = (): ReactElement => (
    <Button
        component={Link}
        href="/"
        startIcon={<HomeIcon />}
    >
        Accueil
    </Button>
);
