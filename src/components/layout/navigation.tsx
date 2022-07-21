import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Search } from "@mui/icons-material";
import classNames from "classnames";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useContext, useState } from "react";
import * as yup from "yup";

import { Field } from "@components/form/field";
import { getSlug } from "@models/word-request";
import { useLockedBody } from "@utils/hooks/use-locked-body";
import { useScrollingDirection } from "@utils/hooks/use-scrolling-direction";

import { OverlayContext } from "./overlay/context";
import { IconButton } from "@mui/material";

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
    const [_, setLocked] = useLockedBody();

    const handleFocus = (): void => {
        setIsFocused(true);
        setLocked(true);
        open();
    };

    const handleBlur = (): void => {
        setIsFocused(false);
        setLocked(false);
        close();
    };

    const { isScrollingUp, scrollPosition } = useScrollingDirection();
    const showNavigation: boolean = isScrollingUp || isFocused;
    const isAtTop: boolean = scrollPosition === 0;

    return (
        <nav
            className={classNames(
                "bg-white z-30 sticky transition-all ease-in-out",
                {
                    "shadow-md": !isAtTop || (showNavigation && !isAtTop),
                    "top-0": showNavigation,
                    "-top-14": !showNavigation
                }
            )}
        >
            <div className="relative container mx-auto px-2 py-2 flex justify-between gap-4">
                {isFocused
                    ? (
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
                    )
                    : (
                        <div className="grow flex justify-center items-center">
                            <h1 className="grow flex items-center gap-2">
                                <IconButton
                                    aria-label="Search"
                                >
                                    <Menu />
                                </IconButton>
                                <Link href="/">
                                    <a
                                        className="hover:text-black transition"
                                        aria-label="Lexique Québécois"
                                    >
                                        {/* TODO Use prominent app bar (https://material.io/components/app-bars-top#anatomy) when text wraps. */}
                                        <div className="text-xl font-bold">
                                            Lexique Québécois
                                        </div>
                                    </a>
                                </Link>
                            </h1>
                            <IconButton
                                onClick={handleFocus}
                                aria-label="Search"
                            >
                                <Search />
                            </IconButton>
                        </div>
                    )}
            </div>
        </nav >
    );
};
