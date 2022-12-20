import { Add } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, ReactElement } from "react";
import useSWR from "swr";

import { Spellings } from "@components/misc/spellings";
import { Definition as DefinitionComponent } from "@components/misc/word";
import { Definition } from "@models/definition";
import { Word } from "@models/word";

export const WordPage = (): ReactElement => {
    const { push, query } = useRouter();
    const { data } = useSWR<Word | null>(`/api/words/${query["slug"]}`);

    // `data` coming from `fallback`
    const word: Word | null = data as Word | null;

    if (!word || word.definitions.length === 0) { // `definitions` should theoretically never be empty.
        const handleClick = async (): Promise<void> => {
            if (!query["label"]) {
                await push("/ajouter");
            }
            else {
                await push(`/ajouter?label=${query["label"]}`, "/ajouter");
            }
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
        <>
            <Head>
                <title>
                    {/* Having the sufix inline creates comment blocks inside the title tag */}
                    {`${query["slug"]} - Lexique Québécois`}
                </title>
                <meta
                    key="description"
                    name="description"
                    content={`${query["label"]} - ${word.definitions[0].definition}`}
                />
            </Head>
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
        </>
    );
};
