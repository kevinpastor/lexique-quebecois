"use client";

import { AppBar, Container, Stack, useScrollTrigger } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

export const NavigationContainer = ({ children }: PropsWithChildren): ReactElement => {
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
                    {children}
                </Stack>
            </Container>
        </AppBar>
    );
};
