import { Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-mui";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { ReactElement } from "react";

import { cleanupWordRequest, WordRequest, wordRequestValidationSchema } from "@models/word-request";
import { addWord } from "@services/words";

const initialValues: WordRequest = {
    label: "",
    definition: "",
    example: "",
    author: ""
};

export const AddPage = (): ReactElement => {
    const {
        push: pushRoute,
        query: routeQuery
    }: NextRouter = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (wordRequest: WordRequest): Promise<void> => {
        const cleanedWordRequest: WordRequest = cleanupWordRequest(wordRequest);
        try {
            await addWord(cleanedWordRequest);
        }
        catch {
            enqueueSnackbar(
                "Une erreur s'est produite. Veuillez réessayer plus tard.",
                { variant: "error" }
            );
            return;
        }

        enqueueSnackbar(
            "Votre contribution a bel et bien été enregistrée. Elle sera examinée sous peu.",
            { variant: "success" }
        );

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
                    <Form>
                        <Card>
                            <CardHeader
                                title="Ajouter un mot"
                                titleTypographyProps={{ variant: "h2" }}
                            />
                            <CardContent>
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div>
                                            <Field
                                                component={TextField}
                                                label="Mot"
                                                name="label"
                                                required
                                                autoFocus
                                            />
                                        </div>
                                        <div>
                                            <Field
                                                component={TextField}
                                                label="Définition"
                                                name="definition"
                                                required
                                                multiline
                                                minRows={2}
                                            />
                                        </div>
                                        <div>
                                            <Field
                                                component={TextField}
                                                label="Exemple"
                                                name="example"
                                                required
                                                multiline
                                                minRows={2}
                                            />
                                        </div>
                                        <div>
                                            <Field
                                                component={TextField}
                                                label="Auteur"
                                                name="author"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardActions>
                                <div className="w-full flex flex-row-reverse">
                                    <LoadingButton
                                        loading={isSubmitting}
                                        startIcon={<Check />}
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Envoyer
                                    </LoadingButton>
                                </div>
                            </CardActions>
                        </Card>
                    </Form>
                )}
            </Formik>
        </>
    );
};
