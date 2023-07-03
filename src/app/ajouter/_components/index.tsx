"use client";

import { useRouter } from "next/navigation";
import { ReactElement } from "react";

import { FormContainer } from "@components/react-hook-form/form-container";
import { useAlerts } from "@hooks/use-alerts";
import { Status } from "@models/status";
import { WithCaptchaToken } from "@models/with-captcha-token";
import { cleanupWordRequestWithCaptchaToken, WordRequest, wordRequestValidationWithCaptchaTokenSchema } from "@models/word-request";
import { isHttpError } from "@utils/http-error";

import { addWord } from "./add-word";
import { Form } from "./form";

const defaultValues: WithCaptchaToken<WordRequest> = {
    label: "",
    definition: "",
    example: "",
    author: "",
    wordClasses: [],
    captchaToken: ""
};

export const AddPage = (): ReactElement => {
    const { push } = useRouter();
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

        push("/");
    };

    return (
        <FormContainer
            useZodFormProps={{
                schema: wordRequestValidationWithCaptchaTokenSchema,
                defaultValues,
                reValidateMode: "onBlur"
            }}
            onSuccess={handleSubmit}
        >
            <Form />
        </FormContainer>
    );
};
