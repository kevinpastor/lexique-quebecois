import { Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Card, CardHeader, CardContent, Link, Stack, CardActions, Typography } from "@mui/material";
import NextLink from "next/link";
import { ReactElement } from "react";
import { useFormState } from "react-hook-form";

import { TextField } from "@components/react-hook-form/text-field";
import { WithCaptchaToken } from "@models/with-captcha-token";
import { WordRequest } from "@models/word-request";
import { useLeavePageConfirmation } from "@utils/hooks/use-leave-page-confirm";

import { Captcha } from "./captcha";
import { WordClassPicker } from "./word-class-picker";

export const Form = (): ReactElement => {
    const { isDirty, isSubmitting } = useFormState<WithCaptchaToken<WordRequest>>();

    useLeavePageConfirmation(isDirty && !isSubmitting, "Votre mot n'a pas encore été soumis, êtes-vous sûr de vouloir l'abandonner?");

    return (
        <Card>
            <CardHeader title="Ajouter un mot" />
            <CardContent>
                <Stack spacing={2}>
                    <Typography>
                        {/* eslint-disable-next-line react/jsx-one-expression-per-line, react/jsx-max-props-per-line */}
                        Assure-toi d&apos;avoir pris connaissance de la <NextLink href="/contenu" passHref legacyBehavior><Link>politique sur le contenu</Link></NextLink> avant d&apos;ajouter un mot.
                    </Typography>
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
                        Envoyer
                    </LoadingButton>
                </Stack>
            </CardActions>
        </Card>
    );
};
