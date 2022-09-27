import { AppBar, Container, Link, Stack, useScrollTrigger } from "@mui/material";
import NextLink from "next/link";
import { ReactElement } from "react";

import { DesktopOnly } from "@components/misc/desktop-only";
import { MobileOnly } from "@components/misc/mobile-only";

import { Menu } from "./menu";
import { Search } from "./search";

export const Navigation = (): ReactElement => {
    const isAtPageTop: boolean = !useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return (
        <AppBar
            color="inherit"
            elevation={isAtPageTop ? 0 : 3}
        >
            <Container>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    my={0.5}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >
                        <MobileOnly>
                            <Menu />
                        </MobileOnly>
                        <Stack
                            direction="row"
                            alignItems="end"
                            spacing={2}
                        >
                            <NextLink
                                href="/"
                                passHref
                            >
                                <Link
                                    variant="h1"
                                    color="inherit"
                                    underline="none"
                                >
                                    Lexique Québécois
                                </Link>
                            </NextLink>
                            <DesktopOnly>
                                <NextLink
                                    href="/ajouter"
                                    passHref
                                >
                                    <Link
                                        variant="subtitle2"
                                        color="default"
                                        underline="hover"
                                    >
                                        Ajouter
                                    </Link>
                                </NextLink>
                                <NextLink
                                    href="/mots"
                                    passHref
                                >
                                    <Link
                                        variant="subtitle2"
                                        color="default"
                                        underline="hover"
                                    >
                                        Index
                                    </Link>
                                </NextLink>
                            </DesktopOnly>
                        </Stack>
                    </Stack>
                    <Search />
                </Stack>
            </Container>
        </AppBar>
    );
};
