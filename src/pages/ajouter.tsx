import { ReactElement } from "react";
import { NextRouter, useRouter } from "next/router";
import { Form, Formik, FormikProps } from "formik";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";

import { WordRequest, wordRequestValidationSchema } from "@models/word-request";
import { Button } from "@components/form/button";
import { Field } from "@components/form/field";
import { addWord } from "@services/words";
import { Title } from "@components/typography/title";
import { Card } from "@components/misc/card";

const initialValues: WordRequest = {
    label: "",
    definition: "",
    example: "",
    author: ""
};

const Add = (): ReactElement => {
    const router: NextRouter = useRouter();

    const handleSubmit = async (word: WordRequest): Promise<void> => {
        const status: boolean = await addWord(word);

        if (!status) {
            alert("Une erreur s'est produite. Veuillez réessayer.");
            return;
        }

        alert("Votre contribution a bel et bien été enregistrée. Elle sera examinée sous peu.");
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
