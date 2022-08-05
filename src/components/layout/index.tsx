import { Box, Container, Grid, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, PropsWithChildren, ReactElement } from "react";

import { Loading } from "@components/misc/loading";

import { Footer } from "./footer";
import { Sidebar } from "./sidebar";

const Navigation = dynamic(async (): Promise<ComponentType> => (
    (await import("./navigation")).Navigation
));

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
                        style={{
                            width: "100%"
                        }}
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
