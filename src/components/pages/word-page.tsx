import { Add } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import useSWR from "swr";

import { Word as WordComponent } from "@components/misc/word";
import { Word } from "@models/word";

export const WordPage = (): ReactElement => {
    const { push, query } = useRouter();
    const { data } = useSWR<Array<Word>>(`/api/words/${query.slug}`);

    // `data` coming from `fallback`
    const wordCollection: Array<Word> | undefined = data as Array<Word> | undefined;

    if (!wordCollection || wordCollection.length === 0) {
        const handleClick = async (): Promise<void> => {
            if (!query.label) {
                await push("/ajouter");
            }
            else {
                await push(`/ajouter?label=${query.label}`, "/ajouter");
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
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                <title>{wordCollection[0].label} - Lexique Québécois</title>
                <meta
                    key="description"
                    name="description"
                    content={`${wordCollection[0].label} - ${wordCollection[0].definition}`}
                />
            </Head>
            <div className="space-y-4">
                {wordCollection.map((word): ReactElement => (
                    <WordComponent
                        key={word.timestamp}
                        word={word}
                    />
                ))}
            </div>
        </>
    );
};
