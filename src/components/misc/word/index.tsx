import { faLink } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useContext } from "react";

import { snackbarsContext, SnackbarsContext } from "@components/feedback/snackbar/context";
import { IconButton } from "@components/form/icon-button";
import { Card } from "@components/misc/card";
import { Type } from "@components/type";
import { Title } from "@components/typography/title";
import { Variant } from "@components/variant";
import { Word as IWord } from "@models/word";
import { useCopyToClipboard } from "@utils/hooks/use-copy-to-clipboard";
import { formatDate } from "@utils/misc/date";

import { Reactions } from "./reactions";

interface Props {
    word: IWord;
}

export const Word = ({ word }: Props): ReactElement => {
    const copy = useCopyToClipboard();
    const { push: pushSnackbar }: SnackbarsContext = useContext(snackbarsContext);

    const handleClick = async (): Promise<void> => {
        try {
            await copy(`${document.location.origin}/mots/${word.slug}`);
        }
        catch {
            pushSnackbar({
                label: "Impossible de copier le lien.",
                variant: Variant.Error
            });
            return;
        }

        pushSnackbar({
            label: "Lien copié dans le presse-papiers.",
            variant: Variant.Success
        });
    };

    return (
        <Card>
            <div className="flex justify-between">
                <Title href={`/mots/${word.slug}`}>
                    {word.label}
                </Title>
                <div className="flex justify-end">
                    <IconButton
                        onClick={handleClick}
                        icon={faLink}
                        ariaLabel="Copier"
                        type={Type.Text}
                    />
                </div>
            </div>
            <div className="space-y-4">
                <div className="font-medium text-lg">
                    {word.definition}
                </div>
                <div className="italic text-lg">
                    {word.example}
                </div>
                <div className="text-slate-400 font-medium text-lg">
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                    par {word.author ?? "Anonyme"}, le {formatDate(word.timestamp)}
                </div>
                <Reactions word={word} />
            </div>
        </Card>
    );
};
