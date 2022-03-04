import { ReactElement } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Form, Formik, FormikProps } from "formik";

import { WordRequest } from "@models";
import { wordRequestValidationSchema } from "@utils/word";
import { Button, Field } from "@components/form";
import { addWord } from "src/requests/word";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

const initialValues: WordRequest = {
    label: "",
    definition: "",
    example: "",
    author: ""
};

const Add: NextPage = (): ReactElement => {
    const router = useRouter();

    const onSubmit = async (word: WordRequest): Promise<void> => {
        const status: boolean = await addWord(word);

        if (!status) {
            alert("Une erreur s'est produite. Veuillez réessayer.");
            return;
        }

        alert("Votre contribution a bel et bien été enregistrée. Elle sera examinée sous peu.");
        await router.push("/");
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={wordRequestValidationSchema}
            validateOnChange={false}
        >
            {({ isSubmitting }: FormikProps<WordRequest>): ReactElement => (
                <Form>
                    <section className="bg-slate-800 rounded-lg p-8 space-y-8">
                        <div className="text-3xl font-bold text-white font-serif">
                            Ajouter un mot
                        </div>
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
                                disabled={isSubmitting}
                                icon={faCloudArrowUp}
                            />
                        </div>
                    </section>
                </Form>
            )}
        </Formik>

    );
};

export default Add;
