import { FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { ReactElement } from "react";

import { useThemeMode, ThemeMode, modes, modeIcons, modeLabels } from "@utils/hooks/use-theme-mode";

export const ThemeSelector = (): ReactElement => {
    const { mode, setMode } = useThemeMode();

    const handleChange = (event: SelectChangeEvent<ThemeMode>): void => {
        const newThemeMode: ThemeMode = event.target.value as ThemeMode;
        setMode(newThemeMode);
    };

    return (
        <FormControl margin="normal">
            <InputLabel>
                Thème
            </InputLabel>
            <Select
                label="Thème"
                value={mode}
                onChange={handleChange}
                renderValue={(value: ThemeMode): ReactElement => (
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
                {modes.map((value: ThemeMode): ReactElement => (
                    <MenuItem
                        key={value}
                        value={value}
                    >
                        <ListItemIcon>
                            {modeIcons[value]}
                        </ListItemIcon>
                        <ListItemText>
                            {modeLabels[value]}
                        </ListItemText>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
