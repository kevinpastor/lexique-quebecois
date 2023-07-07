"use client";

import { ButtonGroup } from "@mui/material";
import { ReactElement } from "react";

import { Definition } from "~/types/definition";

import { Dislikes } from "./dislikes";
import { Likes } from "./likes";
import { useReactions } from "./use-reactions";

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
