import { PaletteMode, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

import { useLocalStorage } from "@utils/hooks/use-local-storage";

export type TernaryMode = "light" | "dark" | "system";

export interface ReturnType {
    mode: PaletteMode;
    ternaryMode: TernaryMode;
    setMode: (ternaryMode: TernaryMode) => void;
}

export const useDarkMode = (): ReturnType => {
    const [ternaryMode, setTernaryMode] = useLocalStorage<TernaryMode>("theme_mode", "system");

    const prefersDarkMode: boolean = useMediaQuery("(prefers-color-scheme: dark)");

    const [mode, setMode] = useState<PaletteMode>("light");

    useEffect((): void => {
        const newMode: PaletteMode = ternaryMode === "system"
            ? prefersDarkMode
                ? "dark"
                : "light"
            : ternaryMode;

        setMode(newMode);
    }, [prefersDarkMode, ternaryMode]);

    return {
        mode,
        ternaryMode,
        setMode: setTernaryMode
    };
};
