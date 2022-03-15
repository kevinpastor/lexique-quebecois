import { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { faPlus, faMagnifyingGlass, faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";

import { getResourceName } from "@utils/word";
import { Field, IconButton } from "@components/form";
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
        const resourceName: string = getResourceName(label);
        await router.push(`/mots/${resourceName}`);
    };

    const onAdd = async (): Promise<void> => {
        await router.push("/ajouter");
    };

    return (
        <nav className="bg-slate-800 sticky sm:relative top-0 shadow sm:shadow-none">
            <div className="container mx-auto p-4 space-y-4">
                <div className="flex flex-row flex-nowrap sm:flex-wrap justify-between gap-4">
                    <Link href="/">
                        <a className="flex flex-row items-center gap-4 sm:basis-full">
                            <FontAwesomeIcon
                                icon={faBookOpenReader}
                                className="w-6 h-6 text-white"
                            />
                            <div className="hidden sm:block text-white text-xl font-extrabold font-serif">
                                Lexique Québécois
                            </div>
                        </a>
                    </Link>
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
                    <div className="flex flex-row gap-4">
                        <IconButton
                            onClick={onAdd}
                            icon={faPlus}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};
