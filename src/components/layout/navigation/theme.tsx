import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ReactElement } from "react";
import { useTernaryDarkMode } from "usehooks-ts";

import { TernaryDarkMode } from "@configs/providers/theme-provider";

export const Theme = (): ReactElement => {
    const { ternaryDarkMode, setTernaryDarkMode } = useTernaryDarkMode();

    const handleChange = (event: SelectChangeEvent<TernaryDarkMode>): void => {
        const themeMode: TernaryDarkMode = event.target.value as TernaryDarkMode;
        setTernaryDarkMode(themeMode);
    };

    return (
        <FormControl>
            <InputLabel>
                Thème
            </InputLabel>
            <Select
                label="Thème"
                value={ternaryDarkMode}
                onChange={handleChange}
            >
                <MenuItem value="system">Automatique</MenuItem>
                <MenuItem value="light">Clair</MenuItem>
                <MenuItem value="dark">Sombre</MenuItem>
            </Select>
        </FormControl>
    );
};
