import { Refresh } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

export const InternalErrorPage = (): ReactElement => {
    const handleClick = (): void => {
        window.location.reload();
    };

    return (
        <>
            <Head>
                <title>Erreur inconnue - Lexique Québécois</title>
            </Head>
            <Card>
                <CardHeader title="Une erreur s'est produite" />
                <CardContent>
                    Impossible de charger l&apos;information
                </CardContent>
                <CardActions>
                    <Stack
                        direction="row-reverse"
                        width="100%"
                    >
                        <Button
                            onClick={handleClick}
                            startIcon={<Refresh />}
                        >
                            Rafraîchir
                        </Button>
                    </Stack>
                </CardActions>
            </Card>
        </>
    );
};
