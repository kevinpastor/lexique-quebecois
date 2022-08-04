import { Box, Container, Grid, Stack } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

import { Loading } from "@components/misc/loading";

import { Footer } from "./footer";
import { Navigation } from "./navigation";
import { Sidebar } from "./sidebar";

export const Layout = ({ children }: PropsWithChildren<unknown>): ReactElement => (
    <>
        <Navigation />
        <Container>
            <Stack
                spacing={2}
                pt={1}
                pb={2}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        md={8}
                    >
                        <Loading>
                            {children}
                        </Loading>
                    </Grid>
                    <Grid
                        item
                        md={4}
                        display={{
                            xs: "none",
                            md: "block"
                        }}
                    >
                        <Stack
                            spacing={2}
                            style={{
                                position: "sticky",
                                top: 54.84 + 8 // Comes from the AppBar height
                            }}
                        >
                            <Sidebar />
                            <Footer />
                        </Stack>
                    </Grid>
                </Grid>
                <Box
                    display={{
                        md: "none"
                    }}
                >
                    <Footer />
                </Box>
            </Stack>
        </Container>
    </>
);
