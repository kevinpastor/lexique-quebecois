"use client";

import { IconButton, Tooltip } from "@mui/material";
import { type ReactElement } from "react";

import { useThemeMode, modeIcons } from "~/hooks/use-theme-mode";

export const IconThemeSelector = (): ReactElement | null => {
    const { mode, cycle } = useThemeMode();

    if (mode === undefined) {
        // This condition is there for SSR, but should never occur since the component is lazy-loaded.
        return null;
    }

    return (
        <Tooltip title="Thème">
            <IconButton onClick={cycle}>
                {modeIcons[mode]}
            </IconButton>
        </Tooltip>
    );
};
