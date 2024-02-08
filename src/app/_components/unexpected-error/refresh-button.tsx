"use client";

import { Refresh } from "@mui/icons-material";
import { Button } from "@mui/material";
import { type ReactNode } from "react";

export const RefreshButton = (): ReactNode => {
    const handleClick = (): void => {
        window.location.reload();
    };

    return (
        <Button
            onClick={handleClick}
            startIcon={<Refresh />}
        >
            Rafraîchir
        </Button>
    );
};
