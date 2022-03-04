import { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";

import { getResourceName } from "@utils/word";
import { Field, IconButton } from "@components/form";

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
        <nav className="bg-slate-800">
            <div className="container mx-auto p-4 space-y-4">
                <Link href="/">
                    <a className="text-white text-2xl font-extrabold font-serif">
                        Québécois Urbain
                    </a>
                </Link>
                <div className="flex flex-row justify-between space-x-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form className="flex-grow">
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
