import { ButtonGroup } from "@mui/material";
import { ReactElement, useEffect } from "react";

import { Word } from "@models/word";
import { BooleanUtilities, useBoolean } from "@utils/hooks/use-boolean";
import { NumberUtilities, useNumber } from "@utils/hooks/use-number";

import { Dislikes } from "./dislikes";
import { Likes } from "./likes";

interface Props {
    word: Word;
}

export const Reactions = ({ word }: Props): ReactElement => {
    const likes: NumberUtilities = useNumber(word.likes);
    const isLiked: BooleanUtilities = useBoolean(word.isLiked);

    const dislikes: NumberUtilities = useNumber(word.dislikes);
    const isDisliked: BooleanUtilities = useBoolean(word.isDisliked);

    useEffect((): void => {
        likes.setValue(word.likes);
        isLiked.setValue(word.isLiked);

        dislikes.setValue(word.dislikes);
        isDisliked.setValue(word.isDisliked);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [word]);

    return (
        <ButtonGroup>
            <Likes
                id={word.id}
                likes={likes}
                isLiked={isLiked}
                dislikes={dislikes}
                isDisliked={isDisliked}
            />
            <Dislikes
                id={word.id}
                dislikes={dislikes}
                isDisliked={isDisliked}
                likes={likes}
                isLiked={isLiked}
            />
        </ButtonGroup>
    );
};
