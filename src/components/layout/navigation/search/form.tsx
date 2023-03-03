import { ArrowBack } from "@mui/icons-material";
import { AppBar, Container, IconButton, Paper, Stack } from "@mui/material";
import { ReactElement, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { AutocompleteResults } from "./autocomplete-results";
import { Field } from "./field";
import { FormValues } from "./search-content";

export interface Props {
    onClose: () => void;
    isOpened: boolean;
}

export const Form = ({ onClose: handleClose, isOpened }: Props): ReactElement => {
    const { reset } = useFormContext<FormValues>();

    const handleBack = (): void => {
        handleClose();
        reset();
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect((): void => {
        if (isOpened) {
            inputRef.current?.focus();
        }
        else {
            inputRef.current?.blur();
        }
    }, [isOpened]);

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
