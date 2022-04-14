import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Form, Formik, FormikProps } from "formik";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { ReactElement, useContext } from "react";

import { Button } from "@components/form/button";
import { Field } from "@components/form/field";
import { Card } from "@components/misc/card";
import { SnackbarsContext, snackbarsContext } from "@components/misc/snackbar/snackbar-context";
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

const Add = (): ReactElement => {
    const {
        push: pushRoute,
        query: routeQuery
    }: NextRouter = useRouter();
    const { push: pushSnackbar }: SnackbarsContext = useContext(snackbarsContext);

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
            label: "Votre contribution a bel et bien été enregistrée. Elle sera examinée sous peu."
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
                                    <Field
                                        label="Mot"
                                        name="label"
                                        autofocus
                                    />
                                    <Field
                                        label="Définition"
                                        name="definition"
                                        type="textarea"
                                    />
                                    <Field
                                        label="Exemple"
                                        name="example"
                                        type="textarea"
                                    />
                                    <Field
                                        label="Auteur"
                                        name="author"
                                    />
                                </div>
                                <div className="flex flex-row-reverse">
                                    <Button
                                        label="Envoyer"
                                        isLoading={isSubmitting}
                                        icon={faCloudArrowUp}
                                        ariaLabel="Envoyer"
                                    />
                                </div>
                            </div>
                        </Card>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Add;
