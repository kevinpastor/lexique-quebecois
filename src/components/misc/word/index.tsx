import { faLink } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useContext } from "react";

import { Tooltip } from "@components/data/tooltip";
import { SnackbarsContext, ISnackbarsContext } from "@components/feedback/snackbar/context";
import { IconButton } from "@components/form/icon-button";
import { Card } from "@components/misc/card";
import { Placement } from "@components/placement";
import { Type } from "@components/type";
import { Title } from "@components/typography/title";
import { Variant } from "@components/variant";
import { Word as IWord } from "@models/word";
import { useCopyToClipboard } from "@utils/hooks/use-copy-to-clipboard";
import { formatDate } from "@utils/misc/date";

import { Reactions } from "./reactions";
import { Button } from "@components/form/button";

interface Props {
    word: IWord;
}

export const Word = ({ word }: Props): ReactElement => {
    const copy = useCopyToClipboard();
    const { push: pushSnackbar }: ISnackbarsContext = useContext(SnackbarsContext);

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
            <div className="space-y-4">
                <div className="flex justify-between">
                    <Title href={`/mots/${word.slug}`}>
                        {word.label}
                    </Title>
                </div>
                <div className="space-y-3 ml-4">
                    <div className="font-semibold text-lg">
                        {word.definition}
                    </div>
                    <div className="italic text-lg">
                        {word.example}
                    </div>
                    <div className="text-black/[.60] font-medium text-lg">
                        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                        par {word.author ?? "Anonyme"}, le {formatDate(word.timestamp)}
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <Reactions word={word} />
                    <Button
                        onClick={handleClick}
                        icon={faLink}
                        label="Partager"
                        ariaLabel="Partager"
                    />
                </div>
            </div>
        </Card>
    );
};
