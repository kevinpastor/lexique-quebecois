import { ArrowBack, Search as SearchIcon } from "@mui/icons-material";
import { IconButton, Modal, Stack } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import * as yup from "yup";

import { getSlug } from "@models/word-request";

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
            .min(2, "")
            .max(32, "")
    });

export const Search = (): ReactElement => {
    const { push } = useRouter();

    const [isOpened, setIsOpened] = useState(false);

    const handleOpen = (): void => {
        setIsOpened(true);
    };

    const handleClose = (): void => {
        setIsOpened(false);
    };

    const onSubmit = async (values: FormValues): Promise<void> => {
        const label: string = values.label;
        const slug: string = getSlug(label);
        handleClose();
        await push(
            `/mots/${slug}?label=${label}`,
            `/mots/${slug}`
        );
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                aria-label="Search"
            >
                <SearchIcon />
            </IconButton>
            <Modal
                open={isOpened}
                onClose={handleClose}
            >
                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form className="w-full bg-white">
                            <div className="container mx-auto pl-2 pr-4 h-14">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    width="100%" // TODO Remove
                                    height="100%" // TODO Remove
                                >
                                    <IconButton onClick={handleClose}>
                                        <ArrowBack />
                                    </IconButton>
                                    <Field
                                        component={TextField}
                                        name="label"
                                        placeholder="Rechercher un mot"
                                        autoFocus
                                        size="small"
                                    />
                                </Stack>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </Modal>
        </>
    );
};
