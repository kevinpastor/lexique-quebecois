import { AppBar, Container, Stack } from "@mui/material";
import { type PropsWithChildren, type ReactElement } from "react";

export const NavigationContainer = ({ children }: PropsWithChildren): ReactElement => (
    <AppBar>
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
    </AppBar>
);
