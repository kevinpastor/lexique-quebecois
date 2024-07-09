"use client";

import { useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { minLength, object, pipe, string } from "valibot";

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
    label: pipe(string(), minLength(1))
});

export const SearchPage = (): ReactNode => {
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
            useFormProps={{
                schema: validationSchema,
                defaultValues: initialValues
            }}
            onSuccess={handleSubmit}
        >
            <Form />
        </FormContainer>
    );
};
