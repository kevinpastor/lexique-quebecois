import { ArrowBack } from "@mui/icons-material";
import { Box, Container, IconButton, Paper, Stack, TextField } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import * as yup from "yup";

import { getSlug } from "@models/word-request";

interface FormValues {
    label: string;
}

const initialValues: FormValues = {
    label: ""
};

const validationSchema = yup
    .object({
        label: yup
            .string()
            .min(2, "Ce champ doit contenir au moins 2 caractères.")
            .max(32, "Ce champ doit contenir au maximum 32 caractères.")
            .required("Ce champ est requis.")
    });

export interface Props {
    onClose: () => void;
}

export const SearchContent = ({ onClose: handleClose }: Props): ReactElement => {
    const { push } = useRouter();

    const onSubmit = async (values: FormValues): Promise<void> => {
        const label: string = values.label.trim();
        const slug: string = getSlug(label);
        handleClose();
        await push(
            `/mots/${slug}?label=${label}`,
            `/mots/${slug}`
        );
    };

    const scrollbarWidth: number = window.innerWidth - document.body.clientWidth;

    return (
        <Paper
            square
            elevation={0}
        >
            <Container>
                <Box
                    ml={-1}
                    mr={`${scrollbarWidth}px`}
                    py={0.5}
                >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ values, handleChange, touched, errors }: FormikProps<FormValues>): ReactElement => (
                            <Form>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <IconButton
                                        onClick={handleClose}
                                        aria-label="Retour"
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <TextField
                                        name="label"
                                        placeholder="Rechercher un mot"
                                        value={values.label}
                                        onChange={handleChange}
                                        error={touched.label && Boolean(errors.label)}
                                        size="small"
                                    />
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Container>
        </Paper>
    );
};
