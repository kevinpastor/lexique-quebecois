"use client";

import { Container, Stack, Unstable_Grid2 as Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, PropsWithChildren, ReactElement } from "react";

import { ErrorBoundary } from "@components/error-boundary";
import { DesktopOnly } from "@components/misc/desktop-only";

import { Footer } from "./footer";
import { UnexpectedError } from "../misc/unexpected-error";

const LazySidebar = dynamic(async (): Promise<{ default: ComponentType }> => ({
    default: (await import("./sidebar")).Sidebar
}));

export const Content = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <Container>
        <Grid
            container
            spacing={2}
            pt={1}
            pb={2}
        >
            <Grid xs>
                <ErrorBoundary fallback={<UnexpectedError />}>
                    {children}
                </ErrorBoundary>
            </Grid>
            <Grid
                xs={12}
                md={4}
            >
                <Stack
                    spacing={2}
                    sx={{
                        position: {
                            md: "sticky"
                        },
                        top: {
                            md: 54.84 + 8 // Comes from the AppBar height
                        }
                    }}
                >
                    <DesktopOnly>
                        <LazySidebar />
                    </DesktopOnly>
                    <Footer />
                </Stack>
            </Grid>
        </Grid>
    </Container>
);
