"use client";

import { useRouter } from "next/navigation";
import { type ReactElement } from "react";
import { object, string } from "zod";

import { FormContainer } from "~/components/react-hook-form/form-container";
import { getSlug } from "~/types/definition";

import { Form } from "./form";

export interface FormValues {
    label: string;
}

const initialValues: FormValues = {
    label: ""
};

const validationSchema = object({
    label: string().min(1)
});

export const SearchPage = (): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { push } = useRouter();

    const navigate = (label: string): void => {
        const slug: string = getSlug(label);
        push(`/mots/${slug}`);
    };

    const handleSubmit = (values: FormValues): void => {
        const label: string = values.label.trim();
        navigate(label);
    };

    return (
        <FormContainer
            useZodFormProps={{
                schema: validationSchema,
                defaultValues: initialValues
            }}
            onSuccess={handleSubmit}
        >
            <Form />
        </FormContainer>
    );
};
