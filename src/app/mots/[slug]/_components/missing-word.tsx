import { Add } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import Link from "next/link";
import { type ReactElement } from "react";

export const MissingWord = (): ReactElement => (
    <Card>
        <CardHeader title="Ce mot n'a pas été trouvé" />
        <CardContent>
            Si tu connais ce mot, tu peux contribuer en fournissant une définition et un exemple.
        </CardContent>
        <CardActions>
            <Stack
                direction="row-reverse"
                width="100%"
            >
                <Button
                    component={Link}
                    href="/contribuer"
                    startIcon={<Add />}
                >
                    Contribuer
                </Button>
            </Stack>
        </CardActions>
    </Card>
);
