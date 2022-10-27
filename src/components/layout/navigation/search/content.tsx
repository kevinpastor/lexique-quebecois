import { ArrowBack } from "@mui/icons-material";
import { AppBar, Container, IconButton, Paper, Stack } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import * as yup from "yup";

import { getSlug } from "@models/definition";

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
            {({ resetForm }: FormikProps<FormValues>): ReactElement => (
                <Paper
                    square
                    elevation={0}
                    sx={{
                        height: "100%",
                        overflowY: "auto"
                    }}
                    component={Form}
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
                                    onClick={(): void => {
                                        handleClose();
                                        resetForm();
                                    }}
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
                        onClose={(): void => {
                            handleClose();
                            resetForm();
                        }}
                    />
                </Paper>
            )}
        </Formik>
    );
};
