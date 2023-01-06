import { ArrowBack } from "@mui/icons-material";
import { AppBar, Container, IconButton, Paper, Stack } from "@mui/material";
import { ReactElement, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { AutocompleteResults } from "./autocomplete-results";
import { FormValues } from "./content";
import { Field } from "./field";

export interface Props {
    onClose: () => void;
}

export const Form = ({ onClose: handleClose }: Props): ReactElement => {
    const { reset } = useFormContext<FormValues>();

    const handleBack = (): void => {
        handleClose();
        reset();
    };

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Paper
            square
            elevation={0}
            sx={{
                height: "100%",
                overflowY: "auto"
            }}
        >
            <AppBar elevation={3}>
                <Container>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        my={0.5}
                    >
                        <IconButton
                            onClick={handleBack}
                            aria-label="Retour"
                            edge="start"
                        >
                            <ArrowBack />
                        </IconButton>
                        <Field ref={inputRef} />
                    </Stack>
                </Container>
            </AppBar>
            <AutocompleteResults
                inputRef={inputRef}
                onClose={handleBack}
            />
        </Paper>
    );
};
