import { Container, Stack, Unstable_Grid2 as Grid } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

import { ErrorBoundary } from "./error-boundary";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";
import { UnexpectedError } from "../unexpected-error";

export const Content = ({ children }: PropsWithChildren): ReactElement => (
    <Container>
        <Grid
            container
            spacing={2}
            py={2}
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
                    spacing={{
                        xs: 0,
                        md: 2
                    }}
                    sx={{
                        position: {
                            md: "sticky"
                        },
                        top: {
                            md: 54.84 + 8 // Comes from the AppBar height
                        }
                    }}
                >
                    <Sidebar />
                    <Footer />
                </Stack>
            </Grid>
        </Grid>
    </Container>
);
