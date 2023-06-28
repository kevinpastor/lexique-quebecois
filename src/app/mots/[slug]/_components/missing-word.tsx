"use client";

import { Add } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

export const MissingWord = (): ReactElement => {
    const { push } = useRouter();

    const handleClick = (): void => {
        push("/ajouter");
    };

    return (
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
                        onClick={handleClick}
                        startIcon={<Add />}
                    >
                        Ajouter
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
};
