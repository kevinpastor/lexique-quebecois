import { Form as FormikForm, Formik } from "formik";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { ReactElement } from "react";

import { Status } from "@models/status";
import { cleanupWordRequest, WordRequest, wordRequestValidationSchema } from "@models/word-request";
import { isHttpError } from "@services/http-error";
import { addWord } from "@services/words";
import { useAlerts } from "@utils/hooks/use-alerts";

import { Form } from "./form";

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
    const { enqueueSuccessAlert, enqueueWarningAlert, enqueueErrorAlert } = useAlerts();

    const handleSubmit = async (wordRequest: WordRequest): Promise<void> => {
        const cleanedWordRequest: WordRequest = cleanupWordRequest(wordRequest);
        try {
            await addWord(cleanedWordRequest);
        }
        catch (error: unknown) {
            if (isHttpError(error) && error.status === Status.TooManyRequest) {
                enqueueWarningAlert("Trop de demandes. Veuillez réessayer plus tard.");
                return;
            }

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
                <FormikForm noValidate>
                    <Form />
                </FormikForm>
            </Formik>
        </>
    );
};
