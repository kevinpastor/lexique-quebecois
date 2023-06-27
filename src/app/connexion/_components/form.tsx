import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import { ReactElement } from "react";
import { useFormState } from "react-hook-form";

import { TextField } from "@components/react-hook-form/text-field";

import { FormValues } from ".";

export const Form = (): ReactElement => {
    const { isSubmitting } = useFormState<FormValues>();

    return (
        <Card>
            <CardHeader title="Connexion" />
            <CardContent>
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    autoFocus
                    required
                />
            </CardContent>
            <CardActions>
                <Stack
                    direction="row-reverse"
                    width="100%"
                >
                    <LoadingButton
                        loading={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Se connecter
                    </LoadingButton>
                </Stack>
            </CardActions>
        </Card>
    );
};
