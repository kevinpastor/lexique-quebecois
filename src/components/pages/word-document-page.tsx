import { ChevronLeft } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { ReactElement, useContext } from "react";
import useSWR from "swr";

import { ISnackbarsContext, SnackbarsContext } from "@components/feedback/snackbar/context";
import { Field } from "@components/form/field";
import { Switch } from "@components/form/switch";
import { Card } from "@components/misc/card";
import { Section } from "@components/typography/section";
import { Title } from "@components/typography/title";
import { Variant } from "@components/variant";
import { WordDocument } from "@models/word-document";
import { deleteWordDocument, updateWordDocument } from "@services/word-document";
import { WithStringId } from "@utils/types/with-string-id";

export const WordDocumentPage = (): ReactElement => {
    const { push, query: { id } } = useRouter();
    const { push: pushSnackbar }: ISnackbarsContext = useContext(SnackbarsContext);

    const { data } = useSWR<WithStringId<WordDocument>>(`/api/admin/${id}`, { revalidateOnMount: false });

    // `data` coming from `fallback`
    const wordDocument: WithStringId<WordDocument> = data as WithStringId<WordDocument>;

    const timestamp: number = parseInt(wordDocument._id.substring(0, 8), 16) * 1000;

    const handleCancel = async (): Promise<void> => {
        await push("/admin");
    };

    const handleSubmit = async (values: WithStringId<WordDocument>): Promise<void> => {
        try {
            await updateWordDocument(values);
        }
        catch {
            pushSnackbar({
                label: "Une erreur s'est produite. Veuillez réessayer plus tard.",
                variant: Variant.Error
            });
            return;
        }

        pushSnackbar({
            label: "Le document a été mis à jour avec succès.",
            variant: Variant.Success
        });
    };

    const handleDelete = async (): Promise<void> => {
        try {
            await deleteWordDocument(id as string);
        }
        catch {
            pushSnackbar({
                label: "Une erreur s'est produite. Veuillez réessayer plus tard.",
                variant: Variant.Error
            });
            return;
        }

        pushSnackbar({
            label: "Le document a été supprimé avec succès.",
            variant: Variant.Success
        });

        await push("/admin");
    };

    return (
        <Formik
            initialValues={{ ...wordDocument }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }: FormikProps<WithStringId<WordDocument>>): ReactElement => (
                <Form>
                    <Card>
                        <Title>
                            <div className="flex items-center">
                                <div className="text-base font-normal">
                                    <IconButton
                                        aria-label="Cancel"
                                        disabled={isSubmitting}
                                        onClick={handleCancel}
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                </div>
                                {wordDocument.label}
                            </div>
                        </Title>
                        <Section>
                            <div className="space-y-4">
                                <div>
                                    <div className="font-medium">
                                        ID
                                    </div>
                                    <div>
                                        {wordDocument._id}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">
                                        Timestamp
                                    </div>
                                    <div>
                                        {new Date(timestamp).toISOString()}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">
                                        IP
                                    </div>
                                    <div>
                                        {wordDocument.ip}
                                    </div>
                                </div>
                                <Field
                                    label="Mot"
                                    name="label"
                                    autofocus
                                />
                                <Field
                                    label="Slug"
                                    name="slug"
                                    autofocus
                                />
                                <Field
                                    label="Définition"
                                    name="definition"
                                    type="textarea"
                                />
                                <Field
                                    label="Exemple"
                                    name="example"
                                    type="textarea"
                                />
                                <Field
                                    label="Auteur"
                                    name="author"
                                />
                                <Switch
                                    label="Is Approved"
                                    name="isApproved"
                                />
                                <div>
                                    <div className="font-medium">
                                        Likes
                                    </div>
                                    <div>
                                        {wordDocument.likes?.length ?? 0}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">
                                        Dislikes
                                    </div>
                                    <div>
                                        {wordDocument.dislikes?.length ?? 0}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        disabled={isSubmitting}
                                        onClick={handleDelete}
                                        color="error"
                                    >
                                        Supprimer
                                    </Button>
                                    <Button
                                        disabled={isSubmitting}
                                    >
                                        Enregistrer
                                    </Button>
                                </div>
                            </div>
                        </Section>
                    </Card>
                </Form>
            )
            }
        </Formik >
    );
};
