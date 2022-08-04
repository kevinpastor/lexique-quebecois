import { Home } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export const NotFoundPage = (): ReactElement => {
    const { push } = useRouter();

    const handleClick = async (): Promise<void> => {
        await push("/");
    };

    return (
        <>
            <Head>
                <title>404 - Lexique Québécois</title>
            </Head>
            <Card>
                <CardHeader title="404" />
                <CardContent>
                    Kossé tu fais icitte?! T&apos;es clairement pas le pogo le plus dégelé de la boite.
                </CardContent>
                <CardActions>
                    <Stack
                        direction="row-reverse"
                        width="100%"
                    >
                        <Button
                            onClick={handleClick}
                            startIcon={<Home />}
                        >
                            Accueil
                        </Button>
                    </Stack>
                </CardActions>
            </Card>
        </>
    );
};
