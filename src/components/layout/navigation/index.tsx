import { AppBar, Container, Link, Stack, Typography, useScrollTrigger } from "@mui/material";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { ComponentType, ReactElement } from "react";

import { DesktopOnly } from "@components/misc/desktop-only";
import { MobileOnly } from "@components/misc/mobile-only";

import { Menu } from "./menu";
import { Search } from "./search";

const LazyIconThemeSelector = dynamic(async (): Promise<{ default: ComponentType }> => ({
    default: (await import("./icon-theme-selector")).IconThemeSelector
}));

export const Navigation = (): ReactElement => {
    const isAtPageTop: boolean = !useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return (
        <AppBar elevation={isAtPageTop ? 0 : 3}>
            <Container>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    my={0.5}
                >
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
                                href="/ajouter"
                                variant="subtitle2"
                                color="default"
                                underline="hover"
                            >
                                Ajouter
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
                        <Search />
                    </Stack>
                </Stack>
            </Container>
        </AppBar>
    );
};
