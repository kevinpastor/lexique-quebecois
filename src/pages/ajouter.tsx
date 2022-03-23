import { ReactElement } from "react";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { Form, Formik, FormikProps } from "formik";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";

import { WordRequest, wordRequestValidationSchema } from "@models/word-request";
import { Button } from "@components/form/button";
import { Field } from "@components/form/field";
import { addWord } from "@services/words";

const initialValues: WordRequest = {
    label: "",
    definition: "",
    example: "",
    author: ""
};

const Add: NextPage = (): ReactElement => {
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
                        <section className="bg-slate-800 rounded-lg p-8 space-y-8">
                            <header>
                                <h2 className="text-3xl font-bold text-slate-100 font-serif">
                                    Ajouter un mot
                                </h2>
                            </header>
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
                        </section>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Add;
