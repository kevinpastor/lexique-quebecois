import { Formik } from "formik";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import * as yup from "yup";

import { getSlug } from "@models/definition";

import { Form } from "./form";

export interface FormValues {
    label: string;
}

const initialValues: FormValues = {
    label: ""
};

const validationSchema = yup
    .object({
        label: yup
            .string()
            .required("Ce champ est requis.")
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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form onClose={handleClose} />
        </Formik>
    );
};
