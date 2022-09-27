import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { ReactElement } from "react";

import { useDarkMode, TernaryMode } from "@utils/hooks/use-dark-mode";

const modes: Array<TernaryMode> = ["system", "light", "dark"];

type ModeInfo<T> = {
    [key in TernaryMode]: T;
};

const modeIcons: ModeInfo<ReactElement> = {
    "system": <SettingsBrightness />,
    "light": <LightMode />,
    "dark": <DarkMode />
};

const modeLabels: ModeInfo<string> = {
    "system": "Automatique",
    "light": "Clair",
    "dark": "Sombre"
};

export const Theme = (): ReactElement => {
    const { ternaryMode, setMode } = useDarkMode();

    const handleChange = (event: SelectChangeEvent<TernaryMode>): void => {
        const themeMode: TernaryMode = event.target.value as TernaryMode;
        setMode(themeMode);
    };

    return (
        <FormControl margin="normal">
            <InputLabel>
                Thème
            </InputLabel>
            <Select
                label="Thème"
                value={ternaryMode}
                onChange={handleChange}
                renderValue={(value: TernaryMode): ReactElement => (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >
                        {modeIcons[value]}
                        <span>
                            {modeLabels[value]}
                        </span>
                    </Stack>
                )}
            >
                {modes.map((mode: TernaryMode): ReactElement => (
                    <MenuItem
                        key={mode}
                        value={mode}
                    >
                        <ListItemIcon>
                            {modeIcons[mode]}
                        </ListItemIcon>
                        <ListItemText>
                            {modeLabels[mode]}
                        </ListItemText>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
