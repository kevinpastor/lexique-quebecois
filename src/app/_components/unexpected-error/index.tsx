import { Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import { ReactElement } from "react";

import { RefreshButton } from "./refresh-button";

export const UnexpectedError = (): ReactElement => (
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
                <RefreshButton />
            </Stack>
        </CardActions>
    </Card>
);
