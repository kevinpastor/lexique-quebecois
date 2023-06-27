"use client";

import { Add } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { ReactElement } from "react";
import useSWR from "swr";

import { Spellings } from "@components/misc/spellings";
import { Definition as DefinitionComponent } from "@components/misc/word";
import { Definition } from "@models/definition";
import { Word } from "@models/word";

interface Props {
    fallback: {
        [endpoint: string]: unknown;
    };
}

export const WordPage = ({ fallback }: Props): ReactElement => {
    const params = useParams();
    // ! TODO Fix type error
    const { data } = useSWR<Word | null>(`/api/words/${params["slug"]}`, { fallback });

    // `data` coming from `fallback`
    const word: Word | null = data as Word | null;

    const { push } = useRouter();

    if (!word || word.definitions.length === 0) { // `definitions` should theoretically never be empty.
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
    }

    return (
        <Stack spacing={2}>
            <DefinitionComponent
                key={word.definitions[0].id}
                definition={word.definitions[0]}
            />
            <Spellings spellings={word.spellings} />
            {word.definitions.slice(1).map((definition: Definition): ReactElement => (
                <DefinitionComponent
                    key={definition.id}
                    definition={definition}
                />
            ))}
        </Stack>
    );
};
