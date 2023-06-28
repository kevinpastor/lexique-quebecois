"use client";

import { Home as HomeIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

export const HomeButton = (): ReactElement => {
    const { push } = useRouter();

    const handleClick = (): void => {
        push("/");
    };

    return (
        <Button
            onClick={handleClick}
            startIcon={<HomeIcon />}
        >
            Accueil
        </Button>
    );
};
