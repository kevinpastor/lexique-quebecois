import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import useSWR from "swr";

import { Card } from "@components/misc/card";
import { Word as WordComponent } from "@components/misc/word";
import { Paragraph } from "@components/typography/paragraph";
import { Section } from "@components/typography/section";
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
                <Typography variant="h2">
                    Ce mot n&apos;a pas été trouvé
                </Typography>
                <Section>
                    <Paragraph>
                        Si vous connaissez ce mot, vous pouvez contributer en fournissant une définition et un exemple.
                    </Paragraph>
                </Section>
                <div className="flex flex-row-reverse">
                    <Button
                        onClick={handleClick}
                        startIcon={<Add />}
                    >
                        Ajouter
                    </Button>
                </div>
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
