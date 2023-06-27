import { ButtonGroup } from "@mui/material";
import { ReactElement } from "react";

import { Definition } from "@models/definition";
import { useReactions } from "@utils/hooks/use-reactions.ts";

import { Dislikes } from "./dislikes";
import { Likes } from "./likes";

interface Props {
    word: Definition;
}

export const Reactions = ({ word }: Props): ReactElement => {
    const {
        likes,
        isLiked,
        toggleLike,
        dislikes,
        isDisliked,
        toggleDislike
    } = useReactions(word.id, word.reactions);

    return (
        <ButtonGroup>
            <Likes
                likes={likes}
                isLiked={isLiked}
                toggleLike={toggleLike}
            />
            <Dislikes
                dislikes={dislikes}
                isDisliked={isDisliked}
                toggleDislike={toggleDislike}
            />
        </ButtonGroup>
    );
};
