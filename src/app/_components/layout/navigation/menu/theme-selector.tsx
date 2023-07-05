import { FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { ReactElement, useId } from "react";

import { useThemeMode, ThemeMode, modes, modeIcons, modeLabels } from "~hooks/use-theme-mode";

export const ThemeSelector = (): ReactElement => {
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
