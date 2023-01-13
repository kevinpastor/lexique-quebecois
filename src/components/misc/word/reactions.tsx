import { ButtonGroup } from "@mui/material";
import { ReactElement } from "react";

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
