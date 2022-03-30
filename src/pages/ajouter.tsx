import { ReactElement, useState } from "react";
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
import { Alert } from "@components/misc/alert";

const initialValues: WordRequest = {
    label: "",
    definition: "",
    example: "",
    author: ""
};

const Add = (): ReactElement => {
    const [isSuccessAlertOpened, setIsSuccessAlertOpened] = useState(false);
    const [isErrorAlertOpened, setIsErrorAlertOpened] = useState(false);
    const router: NextRouter = useRouter();

    const handleSubmit = async (wordRequest: WordRequest): Promise<void> => {
        const cleanedWordRequest: WordRequest = cleanupWordRequest(wordRequest);
        try {
            await addWord(cleanedWordRequest);
        }
        catch {
            setIsErrorAlertOpened(true);
            return;
        }

        setIsSuccessAlertOpened(true);
    };

    const handleSuccessAlertDismiss = async (): Promise<void> => {
        setIsSuccessAlertOpened(false);
        await router.push("/");
    };

    const handleErrorAlertDismiss = (): void => {
        setIsErrorAlertOpened(false);
    };

    return (
        <>
            <Head>
                <title>Ajouter - Lexique Québécois</title>
            </Head>
            <Alert
                isOpened={isSuccessAlertOpened}
                onDismiss={handleSuccessAlertDismiss}
                title="Succès"
                content="Votre contribution a bel et bien été enregistrée. Elle sera examinée sous peu."
            />
            <Alert
                isOpened={isErrorAlertOpened}
                onDismiss={handleErrorAlertDismiss}
                title="Oops"
                content="Une erreur s'est produite. Veuillez réessayer plus tard."
            />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={wordRequestValidationSchema}
                validateOnChange={false}
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
