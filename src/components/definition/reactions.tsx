"use client";

import { ButtonGroup } from "@mui/material";
import DataLoader from "dataloader";
import { ReactElement } from "react";
import useSWR from "swr";

import { fetcher } from "~/app/_components/providers/swr-provider/fetcher";
import { Reactions as IReactions } from "~/types/definition";

import { Dislikes } from "./dislikes";
import { Likes } from "./likes";
import { useReactions } from "./use-reactions";

function fetchDefinitionsReactions(this: DataLoader<string, IReactions, string>, definitionIds: ReadonlyArray<string>): Promise<Array<IReactions>> {
    this.clearAll();
    return fetcher(`/api/words/reactions?definitionIds=${definitionIds.join(",")}`) as Promise<Array<IReactions>>;
}

const definitionsReactionsLoader = new DataLoader(fetchDefinitionsReactions);

const batchFetcher = (id: string) => (): Promise<IReactions> => (
    definitionsReactionsLoader.load(id)
);

interface Props {
    definitionId: string;
}

export const Reactions = ({ definitionId }: Props): ReactElement | null => {
    // Even if the fetch fails, we still let the user interact with the buttons.
    const { data: reactions } = useSWR<IReactions, unknown>(
        `/api/words/${definitionId}/reactions`,
        batchFetcher(definitionId)
    );

    const {
        likes,
        isLiked,
        toggleLike,
        dislikes,
        isDisliked,
        toggleDislike
    } = useReactions(definitionId, reactions);

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
