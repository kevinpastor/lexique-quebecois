"use client";

import { Edit as EditIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactElement } from "react";

export const Actions = (): ReactElement | null => {
    const { status } = useSession();

    if (status !== "authenticated") {
        return null;
    }

    return (
        <IconButton size="small">
            <EditIcon fontSize="small" />
        </IconButton>
    );
};
