import { Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-mui";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { ReactElement, useContext } from "react";

import { ISnackbarsContext, SnackbarsContext } from "@components/feedback/snackbar/context";
import { Card } from "@components/misc/card";
import { Title } from "@components/typography/title";
import { Variant } from "@components/variant";
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
    const { push: pushSnackbar }: ISnackbarsContext = useContext(SnackbarsContext);

    const handleSubmit = async (wordRequest: WordRequest): Promise<void> => {
        const cleanedWordRequest: WordRequest = cleanupWordRequest(wordRequest);
        try {
            await addWord(cleanedWordRequest);
        }
        catch {
            pushSnackbar({
                label: "Une erreur s'est produite. Veuillez réessayer plus tard.",
                variant: Variant.Error
            });
            return;
        }

        pushSnackbar({
            label: "Votre contribution a bel et bien été enregistrée. Elle sera examinée sous peu.",
            variant: Variant.Success
        });

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
                            <Title>
                                Ajouter un mot
                            </Title>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div>
                                        <Field
                                            component={TextField}
                                            label="Mot"
                                            name="label"
                                            autoFocus
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            component={TextField}
                                            label="Définition"
                                            name="definition"
                                            multiline
                                            required
                                            fullWidth
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            component={TextField}
                                            label="Exemple"
                                            name="example"
                                            multiline
                                            required
                                            fullWidth
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
                                <div className="flex flex-row-reverse">
                                    <LoadingButton
                                        loading={isSubmitting}
                                        startIcon={<Check />}
                                        type="submit"
                                    >
                                        Envoyer
                                    </LoadingButton>
                                </div>
                            </div>
                        </Card>
                    </Form>
                )}
            </Formik>
        </>
    );
};
