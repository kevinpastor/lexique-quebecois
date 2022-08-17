import { Share } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import { ReactElement, useEffect, useState } from "react";

import { WordClass, wordClassAbreviations } from "@models/classes";
import { Word as IWord } from "@models/word";
import { useCopyToClipboard } from "@utils/hooks/use-copy-to-clipboard";
import { formatDate } from "@utils/misc/date";

import { Reactions } from "./reactions";

interface Props {
    word: IWord;
}

export const Word = ({ word }: Props): ReactElement => {
    const copy = useCopyToClipboard();
    const { enqueueSnackbar } = useSnackbar();

    const [formattedTimestamp, setFormattedTimestamp] = useState<string | undefined>(undefined);
    useEffect((): void => {
        setFormattedTimestamp(formatDate(word.timestamp));
    }, [word.timestamp]);

    const handleClick = async (): Promise<void> => {
        try {
            await copy(`${document.location.origin}/mots/${word.slug}`);
        }
        catch {
            enqueueSnackbar(
                "Impossible de copier le lien.",
                { variant: "error" }
            );
            return;
        }

        enqueueSnackbar("Lien copié dans le presse-papiers.",
            { variant: "success" }
        );
    };

    return (
        <Card>
            <CardHeader
                title={
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="baseline"
                    >
                        <NextLink
                            href={`/mots/${word.slug}`}
                            passHref
                        >
                            <Link variant="h2">
                                {word.label}
                            </Link>
                        </NextLink>
                        <Typography
                            variant="subtitle2"
                            component="span"
                        >
                            {word.wordClasses.map((wordClass: WordClass, index: number): ReactElement => (
                                <>
                                    {wordClassAbreviations[wordClass]}
                                    {index < word.wordClasses.length - 1 && ", "}
                                </>
                            ))}
                        </Typography>
                    </Stack>
                }
            />
            <CardContent>
                <Stack
                    spacing={1.5}
                    ml={2}
                >
                    <Typography variant="body2">
                        {word.definition}
                    </Typography>
                    <Typography variant="subtitle1">
                        {word.example}
                    </Typography>
                    <Typography variant="subtitle2">
                        {formattedTimestamp
                            ? `par ${word.author ?? "Anonyme"}, le ${formattedTimestamp}`
                            : `par ${word.author ?? "Anonyme"}`}
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    width="100%"
                >
                    <Reactions word={word} />
                    <Button
                        onClick={handleClick}
                        startIcon={<Share />}
                        size="small"
                    >
                        Partager
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
};
