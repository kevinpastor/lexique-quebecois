"use client";

import { useRouter } from "next/navigation";
import { type ReactElement } from "react";

import { FormContainer } from "~/components/react-hook-form/form-container";
import { useAlerts } from "~/hooks/use-alerts";
import { Status } from "~/types/status";
import { type WithToken } from "~/types/with-token";
import { type WordRequest, cleanWordRequestWithToken, wordRequestWithTokenSchema } from "~/types/word-request";
import { isHttpError } from "~/utils/http-error";

import { addWord } from "./add-word";
import { Form } from "./form";

const defaultValues: WithToken<WordRequest> = {
    label: "",
    definition: "",
    example: "",
    author: "",
    wordClasses: [],
    token: ""
};

export const ContributePage = (): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { push } = useRouter();
    const { enqueueSuccessAlert, enqueueWarningAlert, enqueueErrorAlert } = useAlerts();

    const handleSubmit = async (wordRequestWithToken: WithToken<WordRequest>): Promise<void> => {
        const cleanedWordRequestWithToken: WithToken<WordRequest> = cleanWordRequestWithToken(wordRequestWithToken);
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
            useFormProps={{
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
