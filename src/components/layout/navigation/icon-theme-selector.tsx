import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { ReactElement } from "react";

import { useDarkMode, TernaryMode } from "@utils/hooks/use-dark-mode";

const modes: Array<TernaryMode> = ["system", "light", "dark"];

const modeIcons: Record<TernaryMode, ReactElement> = {
    "system": <SettingsBrightness />,
    "light": <LightMode />,
    "dark": <DarkMode />
};

export const IconThemeSelector = (): ReactElement => {
    const { ternaryMode, setMode } = useDarkMode();

    const handleClick = (): void => {
        const nextMode: TernaryMode = modes[(modes.indexOf(ternaryMode) + 1) % modes.length];
        setMode(nextMode);
    };

    return (
        <Tooltip title="Thème">
            <IconButton onClick={handleClick}>
                {modeIcons[ternaryMode]}
            </IconButton>
        </Tooltip>
    );
};
