import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { object, string } from "zod";

import { FormContainer } from "@components/react-hook-form/form-container";
import { getSlug } from "@models/definition";

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

export interface SearchContentProps {
    onClose: () => void;
    isOpened: boolean;
}

export const SearchContent = ({ onClose: handleClose, isOpened }: SearchContentProps): ReactElement => {
    const { push } = useRouter();

    const navigate = (label: string): void => {
        const slug: string = getSlug(label);
        handleClose();
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
            FormProps={{
                style: { height: "100%" }
            }}
        >
            <Form
                onClose={handleClose}
                isOpened={isOpened}
            />
        </FormContainer>
    );
};