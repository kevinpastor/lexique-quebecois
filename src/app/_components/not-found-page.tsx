"use client";

import { Home as HomeIcon } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

export const NotFoundPage = (): ReactElement => {
    const { push } = useRouter();

    const handleClick = (): void => {
        push("/");
    };

    return (
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
                        startIcon={<HomeIcon />}
                    >
                        Accueil
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
};
