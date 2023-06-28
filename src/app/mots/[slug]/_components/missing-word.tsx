import { Button, Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";

import { AddIcon } from "./add-icon";

export const MissingWord = (): ReactElement => (
    <Card>
        <CardHeader title="Ce mot n'a pas été trouvé" />
        <CardContent>
            Si vous connaissez ce mot, vous pouvez contributer en fournissant une définition et un exemple.
        </CardContent>
        <CardActions>
            <Stack
                direction="row-reverse"
                width="100%"
            >
                <Button
                    component={Link}
                    href="/ajouter"
                    startIcon={<AddIcon />}
                >
                    Ajouter
                </Button>
            </Stack>
        </CardActions>
    </Card>
);
