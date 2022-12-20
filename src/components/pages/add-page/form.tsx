import { Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Card, CardHeader, CardContent, Stack, CardActions } from "@mui/material";
import { Field, useFormikContext } from "formik";
import { TextField } from "formik-mui";
import { ReactElement } from "react";

import { useLeavePageConfirmation } from "@utils/hooks/use-leave-page-confirm";

import { WordClassPicker } from "./word-class-picker";

export const Form = (): ReactElement => {
    const { dirty, isSubmitting } = useFormikContext();

    useLeavePageConfirmation(dirty && !isSubmitting, "Votre mot n'a pas encore été soumis, êtes-vous sûr de vouloir l'abandonner?");

    return (
        <Card>
            <CardHeader title="Ajouter un mot" />
            <CardContent>
                <Stack spacing={2}>
                    <Field
                        component={TextField}
                        name="label"
                        label="Mot"
                        required
                        autoFocus
                    />
                    <WordClassPicker />
                    <Field
                        component={TextField}
                        name="definition"
                        label="Définition"
                        required
                        multiline
                        minRows={2}
                    />
                    <Field
                        component={TextField}
                        name="example"
                        label="Exemple"
                        required
                        multiline
                        minRows={2}
                    />
                    <Field
                        component={TextField}
                        name="author"
                        label="Auteur"
                    />
                </Stack>
            </CardContent>
            <CardActions>
                <Stack
                    direction="row-reverse"
                    width="100%"
                >
                    <LoadingButton
                        loading={isSubmitting}
                        startIcon={<Check />}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Envoyer
                    </LoadingButton>
                </Stack>
            </CardActions>
        </Card>
    );
};
