import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";
import { type ReactNode, useCallback } from "react";

export type ThemeMode = "light" | "dark" | "system";

export const modes: Array<ThemeMode> = ["system", "light", "dark"];

export const modeIcons: Record<ThemeMode, ReactNode> = {
    "system": <SettingsBrightness />,
    "light": <LightMode />,
    "dark": <DarkMode />
};

export const modeLabels: Record<ThemeMode, string> = {
    "system": "Automatique",
    "light": "Clair",
    "dark": "Sombre"
};

export interface ReturnType {
    mode: ThemeMode | undefined;
    setMode: (ternaryMode: ThemeMode) => void;
    cycle: () => void;
    activeMode?: Exclude<ThemeMode, "system">;
}

export const useThemeMode = (): ReturnType => {
    const { mode, setMode, systemMode } = useColorScheme();

    const cycle = useCallback((): void => {
        if (mode === undefined) {
            return;
        }

        const nextMode: ThemeMode | undefined = modes[(modes.indexOf(mode) + 1) % modes.length];
        if (!nextMode) { // Should theoritically never happen because of the modulo and the fact that `modes` is a constant.
            return;
        }

        setMode(nextMode);
    }, [mode, setMode]);

    const activeMode: Exclude<ThemeMode, "system"> | undefined = mode === "system"
        ? systemMode
        : mode;

    return {
        mode,
        setMode,
        cycle,
        activeMode
    };
};
