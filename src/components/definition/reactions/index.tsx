"use client";

import { ButtonGroup } from "@mui/material";
import { type ReactNode } from "react";

import { Dislikes } from "./dislikes";
import { Likes } from "./likes";
import { useReactions } from "./use-reactions";

interface Props {
    definitionId: string;
}

export const Reactions = ({ definitionId }: Props): ReactNode => {
    const {
        likes,
        isLiked,
        toggleLike,
        dislikes,
        isDisliked,
        toggleDislike
    } = useReactions(definitionId);

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
