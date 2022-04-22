import { ReactElement, useEffect } from "react";

import { ButtonGroup } from "@components/form/button-group";
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
                slug={word.slug}
                likes={likes}
                isLiked={isLiked}
                dislikes={dislikes}
                isDisliked={isDisliked}
            />
            <Dislikes
                slug={word.slug}
                dislikes={dislikes}
                isDisliked={isDisliked}
                likes={likes}
                isLiked={isLiked}
            />
        </ButtonGroup>
    );
};
