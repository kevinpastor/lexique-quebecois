import { Share } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import { ReactElement } from "react";

import { Word as IWord } from "@models/word";
import { useCopyToClipboard } from "@utils/hooks/use-copy-to-clipboard";
// import { formatDate } from "@utils/misc/date";

import { Reactions } from "./reactions";

interface Props {
    word: IWord;
}

export const Word = ({ word }: Props): ReactElement => {
    const copy = useCopyToClipboard();
    const { enqueueSnackbar } = useSnackbar();

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
                    <NextLink
                        href={`/mots/${word.slug}`}
                        passHref
                    >
                        <Link variant="h2">
                            {word.label}
                        </Link>
                    </NextLink>}
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
                        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                        par ${word.author ?? "Anonyme"}
                        {/* , le ${formatDate(word.timestamp)} */}
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
