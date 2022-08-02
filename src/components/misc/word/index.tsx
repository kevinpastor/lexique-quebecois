import { Share } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactElement } from "react";

import { Title } from "@components/typography/title";
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
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <Title href={`/mots/${word.slug}`}>
                            {word.label}
                        </Title>
                    </div>
                    <div className="space-y-3 ml-4">
                        <Typography variant="body1">
                            {word.definition}
                        </Typography>
                        <Typography variant="subtitle1">
                            {word.example}
                        </Typography>
                        <Typography variant="subtitle2">
                            {/* <div className="text-black/[.60] font-medium text-lg"> */}
                            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                            par {word.author ?? "Anonyme"}, le {formatDate(word.timestamp)}
                        </Typography>
                    </div>
                </div>
            </CardContent>
            <CardActions>
                <div className="flex flex-row justify-between w-full">
                    <Reactions word={word} />
                    <Button
                        onClick={handleClick}
                        startIcon={<Share />}
                    >
                        Partager
                    </Button>
                </div>
            </CardActions>
        </Card>
    );
};
