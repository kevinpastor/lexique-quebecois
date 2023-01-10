import { IconButton, Tooltip } from "@mui/material";
import { ReactElement } from "react";

import { useThemeMode, modeIcons } from "@utils/hooks/use-theme-mode";

export const IconThemeSelector = (): ReactElement | null => {
    const { mode, cycle } = useThemeMode();

    if (mode === undefined) {
        // TODO Replace with a loading indicator. This condition is there for SSR.
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
