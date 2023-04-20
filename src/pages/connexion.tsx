import { Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import { getCsrfToken } from "next-auth/react";
import { ReactElement, useEffect } from "react";

import { useAlerts } from "@utils/hooks/use-alerts";

interface Props {
    csrfToken?: string;
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
    const csrfToken: string | undefined = await getCsrfToken(context);

    return {
        props: { csrfToken }
    };
};

const SignIn = ({ csrfToken }: Props): ReactElement => {
    const { query } = useRouter();
    const { enqueueErrorAlert } = useAlerts();

    useEffect((): void => {
        if (query["error"]) {
            enqueueErrorAlert("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
    }, [enqueueErrorAlert, query]);

    return (
        <form
            method="post"
            action="/api/auth/signin/email"
        >
            <Card>
                <CardHeader title="Connexion" />
                <CardContent>
                    <input
                        name="csrfToken"
                        type="hidden"
                        defaultValue={csrfToken}
                    />
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Se connecter
                        </Button>
                    </Stack>
                </CardActions>
            </Card>
        </form>
    );
};

export default SignIn;
