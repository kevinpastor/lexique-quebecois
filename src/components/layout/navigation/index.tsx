import { AppBar, Box, Container, Link, Paper, Stack, Typography, useScrollTrigger } from "@mui/material";
import NextLink from "next/link";
import { ReactElement } from "react";

import { Menu } from "./menu";
import { Search } from "./search";

export const Navigation = (): ReactElement => {
    const isAtPageTop: boolean = !useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return (
        <AppBar
            elevation={0}
            color="transparent"
        >
            <Paper
                square
                elevation={isAtPageTop ? 0 : 3}
            >
                <Container>
                    <Box
                        my={0.5}
                    >
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
                                <Menu />
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
                            </Stack>
                            <Search />
                        </Stack>
                    </Box>
                </Container>
            </Paper>
        </AppBar>
    );
};
