import { ArrowBack } from "@mui/icons-material";
import { Box, Container, IconButton, Paper, Stack } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
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
            .min(2, "")
            .max(32, "")
    });

export interface Props {
    onClose: () => void;
}

export const SearchContent = ({ onClose: handleClose }: Props): ReactElement => {
    const { push } = useRouter();

    const onSubmit = async (values: FormValues): Promise<void> => {
        const label: string = values.label;
        const slug: string = getSlug(label);
        handleClose();
        await push(
            `/mots/${slug}?label=${label}`,
            `/mots/${slug}`
        );
    };

    return (
        <Paper
            square
            elevation={0}
        >
            <Container>
                <Box
                    // TODO Fix padding on desktop with scrollbar
                    px={-1}
                    py={0.5}
                >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                                width="100%" // TODO Remove
                                height="100%" // TODO Remove
                            >
                                <IconButton
                                    onClick={handleClose}
                                    aria-label="Retour"
                                >
                                    <ArrowBack />
                                </IconButton>
                                <Field
                                    component={TextField}
                                    name="label"
                                    placeholder="Rechercher un mot"
                                    autoFocus
                                    size="small"
                                />
                            </Stack>
                        </Form>
                    </Formik>
                </Box>
            </Container>
        </Paper>
    );
};
