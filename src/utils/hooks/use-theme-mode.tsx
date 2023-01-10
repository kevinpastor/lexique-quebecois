import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { useColorScheme } from "@mui/material";
import { ReactElement, useCallback } from "react";

export type ThemeMode = "light" | "dark" | "system";

export const modes: Array<ThemeMode> = ["system", "light", "dark"];

export const modeIcons: Record<ThemeMode, ReactElement> = {
    "system": <SettingsBrightness />,
    "light": <LightMode />,
    "dark": <DarkMode />
};

export const modeLabels: Record<ThemeMode, string> = {
    "system": "Automatique",
    "light": "Clair",
    "dark": "Sombre"
};

export type ReturnType = {
    mode: ThemeMode | undefined;
    setMode: (ternaryMode: ThemeMode) => void;
    cycle: () => void;
};

export const useThemeMode = (): ReturnType => {
    const { mode, setMode } = useColorScheme();

    const cycle = useCallback((): void => {
        if (mode === undefined) {
            return;
        }

        const nextMode: ThemeMode = modes[(modes.indexOf(mode) + 1) % modes.length];
        setMode(nextMode);
    }, [mode, setMode]);

    return {
        mode,
        setMode,
        cycle
    };
};