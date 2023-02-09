import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { ReactElement } from "react";

import { FormContainer } from "@components/react-hook-form/form-container";
import { Status } from "@models/status";
import { WithCaptchaToken } from "@models/with-captcha-token";
import { cleanupWordRequestWithCaptchaToken, WordRequest, wordRequestValidationWithCaptchaTokenSchema } from "@models/word-request";
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

    const handleSubmit = async (wordRequestWithCaptchaToken: WithCaptchaToken<WordRequest>): Promise<void> => {
        const cleanedWordRequestWithCaptchaToken: WithCaptchaToken<WordRequest> = cleanupWordRequestWithCaptchaToken(wordRequestWithCaptchaToken);
        try {
            await addWord(cleanedWordRequestWithCaptchaToken);
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
            <FormContainer
                useZodFormProps={{
                    schema: wordRequestValidationWithCaptchaTokenSchema,
                    defaultValues: {
                        ...initialValues,
                        ...(
                            routeQuery["label"]
                            && !Array.isArray(routeQuery["label"])
                            && { label: routeQuery["label"] }
                        )
                    },
                    reValidateMode: "onBlur"
                }}
                onSuccess={handleSubmit}
            >
                <Form />
            </FormContainer>
        </>
    );
};
