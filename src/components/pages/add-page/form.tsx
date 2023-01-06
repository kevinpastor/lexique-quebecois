import { Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Card, CardHeader, CardContent, Stack, CardActions } from "@mui/material";
import { ReactElement } from "react";
import { useFormState } from "react-hook-form";

import { TextField } from "@components/react-hook-form/text-field";
import { WordRequest } from "@models/word-request";
import { useLeavePageConfirmation } from "@utils/hooks/use-leave-page-confirm";

import { WordClassPicker } from "./word-class-picker";

export const Form = (): ReactElement => {
    const { isDirty, isSubmitting } = useFormState<WordRequest>();

    useLeavePageConfirmation(isDirty && !isSubmitting, "Votre mot n'a pas encore été soumis, êtes-vous sûr de vouloir l'abandonner?");

    return (
        <Card>
            <CardHeader title="Ajouter un mot" />
            <CardContent>
                <Stack spacing={2}>
                    <TextField
                        name="label"
                        label="Mot"
                        autoFocus
                        required
                    />
                    <WordClassPicker />
                    <TextField
                        name="definition"
                        label="Définition"
                        required
                        multiline
                        minRows={2}
                    />
                    <TextField
                        name="example"
                        label="Exemple"
                        required
                        multiline
                        minRows={2}
                    />
                    <TextField
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
