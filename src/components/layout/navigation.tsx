import { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { faPlus, faMagnifyingGlass, faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";

import { getSlug } from "@models/word-request";
import { Field } from "@components/form/field";
import { IconButton } from "@components/form/icon-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FormValues {
    label: string;
}

const initialValues: FormValues = {
    label: ""
};

const validationSchema = yup
    .object({
        label: yup
            .string()
            .min(2)
            .max(32)
    });

export const Navigation = (): ReactElement => {
    const router = useRouter();

    const onSubmit = async (values: FormValues): Promise<void> => {
        const label: string = values.label;
        const slug: string = getSlug(label);
        await router.push(`/mots/${slug}`);
    };

    const onAdd = async (): Promise<void> => {
        await router.push("/ajouter");
    };

    return (
        <nav className="bg-slate-800 z-10 sticky top-0 shadow-md">
            <div className="container mx-auto p-4 flex sm:flex-wrap gap-4">
                <h1 className="flex items-center sm:basis-full">
                    <Link href="/">
                        <a className="flex items-center gap-4 text-slate-100 hover:text-white transition">
                            <FontAwesomeIcon
                                icon={faBookOpenReader}
                                size="lg"
                            />
                            <div className="hidden sm:block text-xl font-extrabold font-serif">
                                Lexique Québécois
                            </div>
                        </a>
                    </Link>
                </h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form className="grow">
                        <Field
                            name="label"
                            icon={faMagnifyingGlass}
                            placeholder="Chercher un mot"
                            hideErrors
                        />
                    </Form>
                </Formik>
                <IconButton
                    onClick={onAdd}
                    icon={faPlus}
                    ariaLabel="Ajouter"
                />
            </div>
        </nav>
    );
};
