import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ReactElement } from "react";

import { LazyTooltip } from "@components/misc/lazy-tooltip";
import { useDarkMode, TernaryMode } from "@utils/hooks/use-dark-mode";

const modes: Array<TernaryMode> = ["system", "light", "dark"];

type ModeIcons = {
    [key in TernaryMode]: ReactElement;
};

const modeIcons: ModeIcons = {
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
        <LazyTooltip title="Thème">
            <IconButton onClick={handleClick}>
                {modeIcons[ternaryMode]}
            </IconButton>
        </LazyTooltip>
    );
};
