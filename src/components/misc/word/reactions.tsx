import { ButtonGroup } from "@mui/material";
import { ReactElement, useEffect } from "react";

import { Definition } from "@models/definition";
import { BooleanUtilities, useBoolean } from "@utils/hooks/use-boolean";
import { NumberUtilities, useNumber } from "@utils/hooks/use-number";

import { Dislikes } from "./dislikes";
import { Likes } from "./likes";

interface Props {
    word: Definition;
}

export const Reactions = ({ word }: Props): ReactElement => {
    const likes: NumberUtilities = useNumber(word.reactions.likes);
    const isLiked: BooleanUtilities = useBoolean(word.reactions.isLiked);

    const dislikes: NumberUtilities = useNumber(word.reactions.dislikes);
    const isDisliked: BooleanUtilities = useBoolean(word.reactions.isDisliked);

    const { setValue: setLikes } = likes;
    const { setValue: setIsLiked } = isLiked;
    const { setValue: setDislikes } = dislikes;
    const { setValue: setIsDisliked } = isDisliked;

    useEffect((): void => {
        setLikes(word.reactions.likes);
        setIsLiked(word.reactions.isLiked);

        setDislikes(word.reactions.dislikes);
        setIsDisliked(word.reactions.isDisliked);
    }, [setDislikes, setIsDisliked, setIsLiked, setLikes, word]);

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
