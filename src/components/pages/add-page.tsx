import { Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, CardHeader, Checkbox, ListItemText, MenuItem, Stack } from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { Select, TextField } from "formik-mui";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";

import { WordClass, wordClasses } from "@models/classes";
import { cleanupWordRequest, WordRequest, wordRequestValidationSchema } from "@models/word-request";
import { addWord } from "@services/words";
import { useAlerts } from "@utils/hooks/use-alerts";

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
                {({ isSubmitting, values }: FormikProps<WordRequest>): ReactElement => (
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
                                    <Field
                                        component={Select}
                                        name="wordClasses"
                                        label="Classe(s)"
                                        multiple
                                        renderValue={(selected: Array<string>): ReactNode => (selected.join(", "))}
                                    >
                                        {wordClasses.map((wordClass: WordClass): ReactElement => (
                                            <MenuItem
                                                key={wordClass}
                                                value={wordClass}
                                            >
                                                <Checkbox checked={values.wordClasses.includes(wordClass)} />
                                                <ListItemText primary={wordClass} />
                                            </MenuItem>
                                        ))}
                                    </Field>
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
