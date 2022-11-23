import { ArrowBack } from "@mui/icons-material";
import { AppBar, Container, IconButton, Paper, Stack } from "@mui/material";
import { Form as FormikForm, useFormikContext } from "formik";
import { ReactElement } from "react";

import { AutocompleteResults } from "./autocomplete-results";
import { FormValues } from "./content";
import { Field } from "./field";

export interface Props {
    onClose: () => void;
}

export const Form = ({ onClose: handleClose }: Props): ReactElement => {
    const { resetForm } = useFormikContext<FormValues>();

    const handleBack = (): void => {
        handleClose();
        resetForm();
    };

    return (
        <Paper
            square
            elevation={0}
            sx={{
                height: "100%",
                overflowY: "auto"
            }}
            component={FormikForm}
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
                        <Field />
                    </Stack>
                </Container>
            </AppBar>
            <AutocompleteResults
                onClose={handleBack}
            />
        </Paper>
    );
};
