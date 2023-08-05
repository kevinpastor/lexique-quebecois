import { Search } from "@mui/icons-material";
import { IconButton, Link, Stack, Tooltip } from "@mui/material";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { type ComponentType, type ReactElement } from "react";

import { DesktopOnly } from "~/components/desktop-only";
import { NavigationContainer } from "~/components/navigation-container";

import { Menu } from "./menu";

const LazyIconThemeSelector = dynamic(async (): Promise<{ default: ComponentType }> => ({
    default: (await import("./icon-theme-selector")).IconThemeSelector
}));

export const Navigation = (): ReactElement => {
    return (
        <NavigationContainer>
            <Menu />
            <Stack
                direction="row"
                alignItems="end"
                spacing={2}
                sx={{
                    // Workaround for CLS issue coming from the Menu component.
                    // Could be fixed using `useFlexGap`, but it's not supported everywhere.
                    marginLeft: {
                        md: "0px !important"
                    }
                }}
            >
                <Link
                    component={NextLink}
                    href="/"
                    color="inherit"
                    underline="none"
                    typography="h1"
                >
                    Lexique Québécois
                </Link>
                <Stack
                    direction="row"
                    alignItems="end"
                    spacing={2}
                    sx={{
                        display: {
                            xs: "none",
                            md: "inherit"
                        }
                    }}
                >
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
                </Stack>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <DesktopOnly>
                    <LazyIconThemeSelector />
                </DesktopOnly>
                {/* Wrapper required for alignment on desktop. */}
                <div>
                    <Tooltip title="Rechercher">
                        <IconButton
                            component={NextLink}
                            aria-label="Rechercher"
                            edge="end"
                            href="/rechercher"
                        >
                            <Search />
                        </IconButton>
                    </Tooltip>
                </div>
            </Stack>
        </NavigationContainer>
    );
};
