import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { z } from "zod";

import { FormContainer } from "@components/react-hook-form/form-container";
import { getSlug } from "@models/definition";

import { Form } from "./form";

export interface FormValues {
    label: string;
}

const initialValues: FormValues = {
    label: ""
};

const validationSchema = z
    .object({
        label: z.string()
    });

export interface Props {
    onClose: () => void;
}

export const Content = ({ onClose: handleClose }: Props): ReactElement => {
    const { push } = useRouter();

    const navigate = async (label: string): Promise<void> => {
        const slug: string = getSlug(label);
        handleClose();
        await push(
            `/mots/${slug}?label=${label}`, // Used for add form prefilling
            `/mots/${slug}`
        );
    };

    const handleSubmit = async (values: FormValues): Promise<void> => {
        const label: string = values.label.trim();
        await navigate(label);
    };

    return (
        <FormContainer
            useFormProps={{
                defaultValues: initialValues,
                resolver: zodResolver(validationSchema)
            }}
            onSuccess={handleSubmit}
            FormProps={{
                style: { height: "100%" }
            }}
        >
            <Form onClose={handleClose} />
        </FormContainer>
    );
};
