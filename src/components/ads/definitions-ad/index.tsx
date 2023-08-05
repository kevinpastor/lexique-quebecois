"use client";

import { type ReactElement } from "react";

import { useThemeMode } from "~/hooks/use-theme-mode";

import { DefinitionsDarkAd } from "./definitions-dark-ad";
import { DefinitionsLightAd } from "./definitions-light-ad";

export const DefinitionsAd = (): ReactElement | null => {
    const { activeMode } = useThemeMode();

    if (activeMode === "dark") {
        return (
            <DefinitionsDarkAd />
        );
    }

    return (
        <DefinitionsLightAd />
    );
};
