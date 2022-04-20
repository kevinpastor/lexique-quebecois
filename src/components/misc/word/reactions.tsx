import { ReactElement, useEffect } from "react";

import { ButtonGroup } from "@components/form/button-group";
import { Word as IWord } from "@models/word";
import { BooleanUtilities, useBoolean } from "@utils/hooks/use-boolean";
import { NumberUtilities, useNumber } from "@utils/hooks/use-number";

import { Dislikes } from "./dislikes";
import { Likes } from "./likes";

interface Props {
    word: IWord;
}

export const Reactions = ({ word }: Props): ReactElement => {
    const likesNumber: NumberUtilities = useNumber(word.likes);
    const isLikedBoolean: BooleanUtilities = useBoolean(word.isLiked);

    const dislikesNumber: NumberUtilities = useNumber(word.dislikes);
    const isDislikedBoolean: BooleanUtilities = useBoolean(word.isDisliked);

    useEffect((): void => {
        likesNumber.setValue(word.likes);
        isLikedBoolean.setValue(word.isLiked);

        dislikesNumber.setValue(word.dislikes);
        isDislikedBoolean.setValue(word.isDisliked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [word]);

    return (
        <ButtonGroup>
            <Likes
                word={word}
                likesNumber={likesNumber}
                isLikedBoolean={isLikedBoolean}
                dislikesNumber={dislikesNumber}
                isDislikedBoolean={isDislikedBoolean}
            />
            <Dislikes
                word={word}
                dislikesNumber={dislikesNumber}
                isDislikedBoolean={isDislikedBoolean}
                likesNumber={likesNumber}
                isLikedBoolean={isLikedBoolean}
            />
        </ButtonGroup>
    );
};
