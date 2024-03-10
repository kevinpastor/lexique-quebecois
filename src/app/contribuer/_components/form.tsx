import { Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, CardHeader, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { type ReactNode } from "react";
import { useFormState } from "react-hook-form";

import { TextField } from "~/components/react-hook-form/text-field";
import { type WithToken } from "~/types/with-token";
import { type WordRequest } from "~/types/word-request";

import { Captcha } from "./captcha";
import { WordClassPicker } from "./word-class-picker";

export const Form = (): ReactNode => {
    const { isDirty: _, isSubmitting } = useFormState<WithToken<WordRequest>>();

    // TODO Bring back onBeforeUnload
    // useLeavePageConfirmation(isDirty && !isSubmitting, "Ton mot n'a pas encore été soumis, est-tu sûr de vouloir l'abandonner?");

    return (
        <Card>
            <CardHeader title="Contribuer un mot" />
            <CardContent>
                <Stack spacing={2}>
                    <Typography>
                        {/* eslint-disable-next-line react/jsx-one-expression-per-line, react/jsx-max-props-per-line */}
                        Assure-toi d&apos;avoir pris connaissance de la <Link component={NextLink} href="/contenu">politique sur le contenu</Link> avant de continuer.
                    </Typography>
                    <TextField
                        name="label"
                        label="Mot"
                        autoFocus
                        required
                        disabled={isSubmitting}
                    />
                    <WordClassPicker />
                    <TextField
                        name="definition"
                        label="Définition"
                        required
                        multiline
                        minRows={2}
                        disabled={isSubmitting}
                    />
                    <TextField
                        name="example"
                        label="Exemple"
                        required
                        multiline
                        minRows={2}
                        disabled={isSubmitting}
                    />
                    <TextField
                        name="author"
                        label="Auteur"
                        disabled={isSubmitting}
                    />
                    <Captcha />
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
                        Soumettre
                    </LoadingButton>
                </Stack>
            </CardActions>
        </Card>
    );
};
