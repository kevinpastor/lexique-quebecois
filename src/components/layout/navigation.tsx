import { faPlus, faBookOpenReader, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useContext, useState } from "react";
import * as yup from "yup";

import { Field } from "@components/form/field";
import { IconButton } from "@components/form/icon-button";
import { Type } from "@components/type";
import { getSlug } from "@models/word-request";

import { OverlayContext } from "./overlay/context";

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
    const { push } = useRouter();
    const { open, close } = useContext(OverlayContext);

    const onSubmit = async (values: FormValues): Promise<void> => {
        const label: string = values.label;
        const slug: string = getSlug(label);
        await push(
            `/mots/${slug}?label=${label}`,
            `/mots/${slug}`
        );
    };

    const onAdd = async (): Promise<void> => {
        await push("/ajouter");
    };

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (): void => {
        setIsFocused(true);
        open();
    };

    const handleBlur = (): void => {
        setIsFocused(false);
        close();
    };

    return (
        <nav className="bg-slate-800 z-30 sticky top-0 shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between gap-4">
                {isFocused ?
                    (
                        <div className="grow flex justify-center items-center">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                <Form className="grow">
                                    <Field
                                        name="label"
                                        placeholder="Rechercher un mot"
                                        hideErrors
                                        onBlur={handleBlur}
                                        autofocus
                                    />
                                </Form>
                            </Formik>
                        </div>
                    ) : (
                        <>
                            <h1 className="grow flex items-center">
                                <Link href="/">
                                    <a
                                        className="flex items-center gap-4 text-slate-100 hover:text-white transition"
                                        aria-label="Lexique Québécois"
                                    >
                                        <FontAwesomeIcon
                                            icon={faBookOpenReader}
                                            size="lg"
                                        />
                                        {/* TODO Use prominent app bar (https://material.io/components/app-bars-top#anatomy) when text wraps. */}
                                        <div className="text-lg font-extrabold font-serif">
                                            Lexique Québécois
                                        </div>
                                    </a>
                                </Link>
                            </h1>
                            <div className="flex justify-end gap-2">
                                <IconButton
                                    onClick={handleFocus}
                                    icon={faSearch}
                                    ariaLabel="Search"
                                    type={Type.Text}
                                />
                                <IconButton
                                    onClick={onAdd}
                                    icon={faPlus}
                                    ariaLabel="Ajouter"
                                    type={Type.Text}
                                />
                            </div>
                        </>
                    )}
            </div>
        </nav>
    );
};
