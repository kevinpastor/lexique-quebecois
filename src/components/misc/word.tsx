import { ReactElement } from "react";

import { Title } from "@components/typography/title";
import { Word as IWord } from "@models/word";
import { formatDate } from "@utils/misc/date";

import { Card } from "./card";

interface Props {
    word: IWord;
}

export const Word = ({ word }: Props): ReactElement => (
    <Card>
        <Title href={`/mots/${word.slug}`}>
            {word.label}
        </Title>
        <div className="space-y-4">
            <div className="font-medium text-lg">
                {word.definition}
            </div>
            <div className="italic text-lg">
                {word.example}
            </div>
            <div>
                <div className="text-slate-400 font-medium text-lg">
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                    par {word.author ?? "Anonyme"}, le {formatDate(word.timestamp)}
                </div>
            </div>
        </div>
    </Card>
);
