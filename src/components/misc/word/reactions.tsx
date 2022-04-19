import { ReactElement } from "react";

import { ButtonGroup } from "@components/form/button-group";
import { Word as IWord } from "@models/word";

import { Likes } from "./likes";

interface Props {
    word: IWord;
}

export const Reactions = ({ word }: Props): ReactElement => (
    <ButtonGroup>
        <Likes word={word} />
    </ButtonGroup>
);
