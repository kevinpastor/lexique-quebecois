import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ReactElement } from "react";

import { useDarkMode, TernaryMode } from "@utils/hooks/use-dark-mode";

export const Theme = (): ReactElement => {
    const { ternaryMode, setMode } = useDarkMode();

    const handleChange = (event: SelectChangeEvent<TernaryMode>): void => {
        const themeMode: TernaryMode = event.target.value as TernaryMode;
        setMode(themeMode);
    };

    return (
        <FormControl>
            <InputLabel>
                Thème
            </InputLabel>
            <Select
                label="Thème"
                value={ternaryMode}
                onChange={handleChange}
            >
                <MenuItem value="system">Automatique</MenuItem>
                <MenuItem value="light">Clair</MenuItem>
                <MenuItem value="dark">Sombre</MenuItem>
            </Select>
        </FormControl>
    );
};
