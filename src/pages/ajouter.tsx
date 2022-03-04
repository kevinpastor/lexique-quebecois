import { NextPage } from "next";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { Field, Form, Formik, FormikProps, useFormikContext } from "formik";
import * as yup from "yup";

import { WordsPostRequestBody } from "@models";
import { labelRegex } from "@utils/word";
import { Button } from "@components/form";

const initialValues: WordsPostRequestBody = {
    label: "",
    definition: "",
    example: "",
    author: ""
};

const validationSchema = yup
    .object({
        label: yup
            .string()
            .trim()
            .min(2, "Ce champ ne peut pas avoir moins de 2 caractères.")
            .max(32, "Ce champ ne peut pas dépasser 32 caractères.")
            .matches(labelRegex)
            .required("Ce champ est requis."),
        definition: yup
            .string()
            .trim()
            .min(2, "Ce champ ne peut pas avoir moins de 2 caractères.")
            .max(256, "Ce champ ne peut pas dépasser 256 caractères.")
            .required("Ce champ est requis."),
        example: yup
            .string()
            .trim()
            .min(2, "Ce champ ne peut pas avoir moins de 2 caractères.")
            .max(256, "Ce champ ne peut pas dépasser 256 caractères.")
            .required("Ce champ est requis."),
        author: yup
            .string()
            .trim()
            .min(2)
            .max(32)
            .optional()
    });

interface TextFieldProps<T> {
    label: string;
    name: keyof T;
    autofocus?: boolean;
    type?: "input" | "select" | "textarea";
}

const TextField = <T,>({ label, name, autofocus, type = "input" }: TextFieldProps<T>): ReactElement => {
    const { touched, errors } = useFormikContext<T>();
    return (
        <div className="space-y-1">
            <label className="text-slate-200">
                {label}
            </label>
            <Field
                name={name}
                as={type}
                autofocus={autofocus/* FIXME */}
                className="rounded bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 transition px-4 py-2 outline-none text-slate-300 w-full resize-none"
            />
            {touched[name] &&
                <div className="text-slate-600 text-sm">
                    {errors[name]}
                </div>
            }
        </div>
    );
};

const Add: NextPage = (): ReactElement => {
    const router = useRouter();

    const onSubmit = async (word: WordsPostRequestBody, formikHelpers: FormikHelpers<WordsPostRequestBody>): Promise<void> => {
        console.log(word);
        //const status: boolean = await addWord(word);

        // if (!status) {
        // alert("Une erreur s'est produite. Veuillez réessayer.");
        // return;
        // }

        // alert("Votre contribution a bel et bien été enregistrée. Elle sera examinée sous peu.");
        // await router.push("/");
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
        >
            <Form>
                <section className="bg-slate-800 rounded-lg p-8 space-y-8">
                    <div className="text-3xl font-bold text-white font-serif">
                        Ajouter un mot
                    </div>
                    <div className="space-y-4">
                        <TextField
                            label="Mot"
                            name="label"
                        />
                        <TextField
                            label="Définition"
                            name="definition"
                            type="textarea"
                        />
                        <TextField
                            label="Exemple"
                            name="example"
                        />
                        <TextField
                            label="Auteur"
                            name="author"
                        />
                    </div>
                    <div className="flex flex-row-reverse">
                        <Button
                            label="Envoyer"
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 fill-transparent stroke-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className="stroke-2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                    />
                                </svg>
                            }
                        />
                    </div>
                </section>
            </Form>
        </Formik>

    );
};

export default Add;
