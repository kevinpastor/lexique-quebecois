"use client";

import { Refresh } from "@mui/icons-material";
import { Button } from "@mui/material";
import { type ReactElement } from "react";

export const RefreshButton = (): ReactElement => {
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
