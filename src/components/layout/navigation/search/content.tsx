import { ArrowBack } from "@mui/icons-material";
import { AppBar, Container, IconButton, Paper, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import * as yup from "yup";

import { getSlug } from "@models/word-request";

import { AutocompleteResults } from "./autocomplete-results";
import { Field } from "./field";

export interface FormValues {
    label: string;
}

const initialValues: FormValues = {
    label: ""
};

const validationSchema = yup
    .object({
        label: yup
            .string()
            .required("Ce champ est requis.")
    });

export interface Props {
    onClose: () => void;
}

export const Content = ({ onClose: handleClose }: Props): ReactElement => {
    const { push } = useRouter();

    const handleSubmit = async (values: FormValues): Promise<void> => {
        const label: string = values.label.trim();
        const slug: string = getSlug(label);
        handleClose();
        await push(
            `/mots/${slug}?label=${label}`, // Used for add form prefilling
            `/mots/${slug}`
        );
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Paper
                square
                elevation={0}
                sx={{
                    height: "100%",
                    overflowY: "auto"
                }}
                component={Form}
            >
                <AppBar
                    color="inherit"
                    elevation={3}
                >
                    <Container>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            my={0.5}
                        >
                            <IconButton
                                onClick={handleClose}
                                aria-label="Retour"
                                edge="start"
                            >
                                <ArrowBack />
                            </IconButton>
                            <Field />
                        </Stack>
                    </Container>
                </AppBar>
                <AutocompleteResults onClose={handleClose} />
            </Paper>
        </Formik>
    );
};
