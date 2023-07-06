"use client";

import { useRouter } from "next/navigation";
import { ReactElement } from "react";

import { FormContainer } from "~components/react-hook-form/form-container";
import { useAlerts } from "~hooks/use-alerts";
import { Status } from "~types/status";
import { WithCaptchaToken } from "~types/with-captcha-token";
import { cleanWordRequestWithToken, WordRequest, wordRequestWithTokenSchema } from "~types/word-request";
import { isHttpError } from "~utils/http-error";

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
        const cleanedWordRequestWithToken: WithCaptchaToken<WordRequest> = cleanWordRequestWithToken(wordRequestWithCaptchaToken);
        try {
            await addWord(cleanedWordRequestWithToken);
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
                schema: wordRequestWithTokenSchema,
                defaultValues,
                reValidateMode: "onBlur"
            }}
            onSuccess={handleSubmit}
        >
            <Form />
        </FormContainer>
    );
};
