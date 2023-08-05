import { AppBar, Container, Stack, Toolbar } from "@mui/material";
import { type PropsWithChildren, type ReactElement } from "react";

export const NavigationContainer = ({ children }: PropsWithChildren): ReactElement => (
    <>
        <AppBar>
            <Toolbar disableGutters>
                <Container>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                        my={0.5}
                    >
                        {children}
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
        {/** Required in order to offset the rest of the layout. */}
        <Toolbar />
    </>
);
