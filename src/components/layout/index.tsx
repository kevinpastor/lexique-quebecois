import { Container, Stack, Unstable_Grid2 as Grid } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

import { DesktopOnly } from "@components/misc/desktop-only";
import { Loading } from "@components/misc/loading";

import { Footer } from "./footer";
import { Navigation } from "./navigation";
import { Sidebar } from "./sidebar";

export const Layout = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <>
        <Navigation />
        <Container>
            <Grid
                container
                spacing={2}
                pt={1}
                pb={2}
            >
                <Grid
                    xs={12}
                    md={8}
                >
                    <Loading>
                        {children}
                    </Loading>
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
                            <Sidebar />
                        </DesktopOnly>
                        <Footer />
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    </>
);
