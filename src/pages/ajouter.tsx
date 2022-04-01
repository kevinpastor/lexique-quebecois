import { ReactElement, useContext } from "react";
import { NextRouter, useRouter } from "next/router";
import { Form, Formik, FormikProps } from "formik";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";

import { cleanupWordRequest, WordRequest, wordRequestValidationSchema } from "@models/word-request";
import { Button } from "@components/form/button";
import { Field } from "@components/form/field";
import { addWord } from "@services/words";
import { Title } from "@components/typography/title";
import { Card } from "@components/misc/card";
import { SnackbarsContext, snackbarsContext } from "@components/misc/snackbar/snackbar-context";
import { Variant } from "@components/variant";

const initialValues: WordRequest = {
    label: "",
    definition: "",
    example: "",
    author: ""
};

const Add = (): ReactElement => {
    const router: NextRouter = useRouter();
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

        await router.push("/");
    };

    return (
        <>
            <Head>
                <title>Ajouter - Lexique Québécois</title>
            </Head>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={wordRequestValidationSchema}
            >
                {({ isSubmitting, isValid }: FormikProps<WordRequest>): ReactElement => (
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
                                    />
                                    <Field
                                        label="Définition"
                                        name="definition"
                                        type="textarea"
                                    />
                                    <Field
                                        label="Exemple"
                                        name="example"
                                    />
                                    <Field
                                        label="Auteur"
                                        name="author"
                                    />
                                </div>
                                <div className="flex flex-row-reverse">
                                    <Button
                                        label="Envoyer"
                                        disabled={isSubmitting || !isValid}
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
