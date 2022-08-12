import { Close } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormLabel, IconButton, Stack, Typography } from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { Switch, TextField } from "formik-mui";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { ReactElement } from "react";
import useSWR from "swr";

import { WordDocument } from "@models/word-document";
import { deleteWordDocument, updateWordDocument } from "@services/word-document";
import { WithStringId } from "@utils/types/with-string-id";

export const WordDocumentPage = (): ReactElement => {
    const { push, query: { id } } = useRouter();
    const { enqueueSnackbar } = useSnackbar();

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
            enqueueSnackbar(
                "Une erreur s'est produite. Veuillez réessayer plus tard.",
                { variant: "error" }
            );
            return;
        }

        enqueueSnackbar(
            "Le document a été mis à jour avec succès.",
            { variant: "success" }
        );
    };

    const handleDelete = async (): Promise<void> => {
        try {
            await deleteWordDocument(id as string);
        }
        catch {
            enqueueSnackbar(
                "Une erreur s'est produite. Veuillez réessayer plus tard.",
                { variant: "error" }
            );
            return;
        }

        enqueueSnackbar(
            "Le document a été supprimé avec succès.",
            { variant: "success" }
        );

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
                        <CardHeader
                            action={
                                <IconButton
                                    onClick={handleCancel}
                                    disabled={isSubmitting}
                                    size="small"
                                    aria-label="Cancel"
                                >
                                    <Close />
                                </IconButton>
                            }
                            title={wordDocument.label}
                        />
                        <CardContent>
                            <Stack spacing={2}>
                                <div>
                                    <Typography variant="body2">
                                        ID
                                    </Typography>
                                    <div>
                                        {wordDocument._id}
                                    </div>
                                </div>
                                <div>
                                    <Typography variant="body2">
                                        Timestamp
                                    </Typography>
                                    <div>
                                        {new Date(timestamp).toISOString()}
                                    </div>
                                </div>
                                <div>
                                    <Typography variant="body2">
                                        IP
                                    </Typography>
                                    <div>
                                        {wordDocument.ip}
                                    </div>
                                </div>
                                <Field
                                    component={TextField}
                                    label="Mot"
                                    name="label"
                                    required
                                />
                                <Field
                                    component={TextField}
                                    label="Slug"
                                    name="slug"
                                />
                                <Field
                                    component={TextField}
                                    label="Définition"
                                    name="definition"
                                    multiline
                                />
                                <Field
                                    component={TextField}
                                    label="Exemple"
                                    name="example"
                                    multiline
                                />
                                <Field
                                    component={TextField}
                                    label="Auteur"
                                    name="author"
                                />
                                <FormControl
                                    component="fieldset"
                                    variant="standard"
                                >
                                    <FormLabel component="legend">Is Approved</FormLabel>
                                    <Field
                                        component={Switch}
                                        type="checkbox"
                                        name="isApproved"
                                    />
                                </FormControl>
                                <div>
                                    <Typography variant="body2">
                                        Likes
                                    </Typography>
                                    <div>
                                        {wordDocument.likes?.length ?? 0}
                                    </div>
                                </div>
                                <div>
                                    <Typography variant="body2">
                                        Dislikes
                                    </Typography>
                                    <div>
                                        {wordDocument.dislikes?.length ?? 0}
                                    </div>
                                </div>
                            </Stack>
                        </CardContent>
                        <CardActions>
                            <Stack
                                direction="row-reverse"
                                width="100%"
                                spacing={1}
                            >
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Enregistrer
                                </Button>
                                <Button
                                    disabled={isSubmitting}
                                    onClick={handleDelete}
                                    color="error"
                                >
                                    Supprimer
                                </Button>
                            </Stack>
                        </CardActions>
                    </Card>
                </Form>
            )
            }
        </Formik >
    );
};
