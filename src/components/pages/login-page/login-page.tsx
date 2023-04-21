import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { ReactElement, useEffect } from "react";
import { object, string } from "zod";

import { FormContainer } from "@components/react-hook-form/form-container";
import { useAlerts } from "@utils/hooks/use-alerts";

import { Form } from "./form";

export interface FormValues {
    email: string;
}

const schema = object({
    email: string()
        .email("Ce champ doit être un email valide.")
});

const defaultValues: FormValues = {
    email: ""
};

export const LoginPage = (): ReactElement => {
    const { query } = useRouter();
    const { enqueueErrorAlert } = useAlerts();

    useEffect((): void => {
        if (query["error"]) {
            enqueueErrorAlert("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
    }, [enqueueErrorAlert, query]);

    const handleSubmit = async ({ email }: FormValues): Promise<void> => {
        await signIn("email", { email });
    };

    return (
        <FormContainer
            useZodFormProps={{
                schema,
                defaultValues,
                reValidateMode: "onBlur"
            }}
            onSuccess={handleSubmit}
        >
            <Form />
        </FormContainer>
    );
};
