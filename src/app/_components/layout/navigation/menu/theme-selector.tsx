import { FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, type SelectChangeEvent, Stack } from "@mui/material";
import { type ReactNode, useId } from "react";

import { type ThemeMode, modeIcons, modeLabels, modes, useThemeMode } from "~/hooks/use-theme-mode";

export const ThemeSelector = (): ReactNode => {
    const { mode, setMode } = useThemeMode();

    const handleChange = (event: SelectChangeEvent<ThemeMode>): void => {
        const newThemeMode: ThemeMode = event.target.value as ThemeMode;
        setMode(newThemeMode);
    };

    const id: string = useId();

    return (
        <FormControl margin="normal">
            <InputLabel id={id}>
                Thème
            </InputLabel>
            <Select
                label="Thème"
                labelId={id}
                value={mode}
                onChange={handleChange}
                renderValue={(value: ThemeMode): ReactNode => (
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
                {modes.map((value: ThemeMode): ReactNode => (
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
