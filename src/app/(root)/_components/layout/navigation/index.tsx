import { Search as SearchIcon } from "@mui/icons-material";
import { IconButton, Link, Stack, Tooltip, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { ComponentType, ReactElement } from "react";

import { DesktopOnly } from "~/components/desktop-only";
import { MobileOnly } from "~/components/mobile-only";

import { Menu } from "./menu";
import { NavigationContainer } from "../../../../../components/navigation-container";

const LazyIconThemeSelector = dynamic(async (): Promise<{ default: ComponentType }> => ({
    default: (await import("./icon-theme-selector")).IconThemeSelector
}));

export const Navigation = (): ReactElement => {
    return (
        <NavigationContainer>
            <MobileOnly>
                <Menu />
            </MobileOnly>
            <Stack
                direction="row"
                alignItems="end"
                spacing={2}
            >
                <Typography variant="h1">
                    <Link
                        component={NextLink}
                        href="/"
                        color="inherit"
                        underline="none"
                    >
                        Lexique Québécois
                    </Link>
                </Typography>
                <DesktopOnly>
                    <Link
                        component={NextLink}
                        href="/contribuer"
                        variant="subtitle2"
                        color="default"
                        underline="hover"
                    >
                        Contribuer
                    </Link>
                    <Link
                        component={NextLink}
                        href="/mots"
                        variant="subtitle2"
                        color="default"
                        underline="hover"
                    >
                        Index
                    </Link>
                    <Link
                        component={NextLink}
                        href="/contact"
                        variant="subtitle2"
                        color="default"
                        underline="hover"
                    >
                        Contact
                    </Link>
                </DesktopOnly>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <DesktopOnly>
                    <LazyIconThemeSelector />
                </DesktopOnly>
                <div>
                    <Tooltip title="Rechercher">
                        <IconButton
                            component={NextLink}
                            aria-label="Rechercher"
                            edge="end"
                            href="/rechercher"
                        >
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </Stack>
        </NavigationContainer>
    );
};
