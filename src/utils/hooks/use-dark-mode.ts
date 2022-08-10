import { PaletteMode, useMediaQuery } from "@mui/material";
import { useLocalStorage } from "usehooks-ts"; // TODO Replace with custom implementation

export type TernaryMode = "light" | "dark" | "system";

export interface ReturnType {
    mode: PaletteMode;
    ternaryMode: TernaryMode;
    setMode: (ternaryMode: TernaryMode) => void;
}

export const useDarkMode = (): ReturnType => {
    const [ternaryMode, setTernaryMode] = useLocalStorage<TernaryMode>("theme_mode", "system");

    const prefersDarkMode: boolean = useMediaQuery("(prefers-color-scheme: dark)");

    const mode: PaletteMode =
        ternaryMode === "system"
            ? prefersDarkMode
                ? "dark"
                : "light"
            : ternaryMode;

    return {
        mode,
        ternaryMode,
        setMode: setTernaryMode
    };
};
