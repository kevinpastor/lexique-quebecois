import { Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import { type ReactNode } from "react";

import { HomeButton } from "./home-button";

export const NotFoundPage = (): ReactNode => {
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
                    <HomeButton />
                </Stack>
            </CardActions>
        </Card>
    );
};
