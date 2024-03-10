"use client";

import { type ReactNode } from "react";

import { useThemeMode } from "~/hooks/use-theme-mode";

import { DefinitionsDarkAd } from "./definitions-dark-ad";
import { DefinitionsLightAd } from "./definitions-light-ad";

export const DefinitionsAd = (): ReactNode => {
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
