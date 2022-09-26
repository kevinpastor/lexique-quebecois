import { AppBar, Box, Container, Link, Stack, Typography, useScrollTrigger } from "@mui/material";
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
                <Box my={0.5}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
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
                                <Typography variant="h1">
                                    <NextLink
                                        href="/"
                                        passHref
                                    >
                                        <Link
                                            color="inherit"
                                            underline="none"
                                        >
                                            Lexique Québécois
                                        </Link>
                                    </NextLink>
                                </Typography>
                                <DesktopOnly>
                                    <Typography variant="subtitle2">
                                        <NextLink
                                            href="/ajouter"
                                            passHref
                                        >
                                            <Link
                                                color="inherit"
                                                underline="hover"
                                            >
                                                Ajouter
                                            </Link>
                                        </NextLink>
                                    </Typography>
                                </DesktopOnly>
                                <DesktopOnly>
                                    <Typography variant="subtitle2">
                                        <NextLink
                                            href="/mots"
                                            passHref
                                        >
                                            <Link
                                                color="inherit"
                                                underline="hover"
                                            >
                                                Index
                                            </Link>
                                        </NextLink>
                                    </Typography>
                                </DesktopOnly>
                            </Stack>
                        </Stack>
                        <Search />
                    </Stack>
                </Box>
            </Container>
        </AppBar>
    );
};
