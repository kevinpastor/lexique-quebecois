import { Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-mui";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { ReactElement } from "react";

import { cleanupWordRequest, WordRequest, wordRequestValidationSchema } from "@models/word-request";
import { addWord } from "@services/words";
import { useAlerts } from "@utils/hooks/use-alerts";

import { WordClassPicker } from "./word-class-picker";

const initialValues: WordRequest = {
    label: "",
    definition: "",
    example: "",
    author: "",
    wordClasses: []
};

export const AddPage = (): ReactElement => {
    const {
        push: pushRoute,
        query: routeQuery
    }: NextRouter = useRouter();
    const { enqueueSuccessAlert, enqueueErrorAlert } = useAlerts();

    const handleSubmit = async (wordRequest: WordRequest): Promise<void> => {
        const cleanedWordRequest: WordRequest = cleanupWordRequest(wordRequest);
        try {
            await addWord(cleanedWordRequest);
        }
        catch {
            enqueueErrorAlert("Une erreur s'est produite. Veuillez réessayer plus tard.");
            return;
        }

        enqueueSuccessAlert("Votre contribution a bel et bien été enregistrée. Elle sera examinée sous peu.");

        await pushRoute("/");
    };

    return (
        <>
            <Head>
                <title>Ajouter - Lexique Québécois</title>
            </Head>
            <Formik
                initialValues={{
                    ...initialValues,
                    ...(
                        routeQuery.label
                        && !Array.isArray(routeQuery.label)
                        && { label: routeQuery.label }
                    )
                }}
                onSubmit={handleSubmit}
                validationSchema={wordRequestValidationSchema}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {({ isSubmitting }: FormikProps<WordRequest>): ReactElement => (
                    <Form noValidate>
                        <Card>
                            <CardHeader title="Ajouter un mot" />
                            <CardContent>
                                <Stack spacing={2}>
                                    <Field
                                        component={TextField}
                                        name="label"
                                        label="Mot"
                                        required
                                        autoFocus
                                    />
                                    <WordClassPicker />
                                    <Field
                                        component={TextField}
                                        name="definition"
                                        label="Définition"
                                        required
                                        multiline
                                        minRows={2}
                                    />
                                    <Field
                                        component={TextField}
                                        name="example"
                                        label="Exemple"
                                        required
                                        multiline
                                        minRows={2}
                                    />
                                    <Field
                                        component={TextField}
                                        name="author"
                                        label="Auteur"
                                    />
                                </Stack>
                            </CardContent>
                            <CardActions>
                                <Stack
                                    direction="row-reverse"
                                    width="100%"
                                >
                                    <LoadingButton
                                        loading={isSubmitting}
                                        startIcon={<Check />}
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Envoyer
                                    </LoadingButton>
                                </Stack>
                            </CardActions>
                        </Card>
                    </Form>
                )}
            </Formik>
        </>
    );
};
