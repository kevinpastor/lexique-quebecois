import DataLoader from "dataloader";
import { useEffect, useReducer } from "react";
import useSWR from "swr";

import { fetcher } from "~/app/_components/providers/swr-provider/fetcher";
import { useAlerts } from "~/hooks/use-alerts";
import { type Reactions } from "~/types/definition";
import { Status } from "~/types/status";

import { dislikeAction } from "./actions/dislike-action";
import { likeAction } from "./actions/like-action";
import { removeDislikeAction } from "./actions/remove-dislike-action";
import { removeLikeAction } from "./actions/remove-like-action";
import { type LoadableReactions, reducer } from "./reducer";

function fetchDefinitionsReactions(this: DataLoader<string, Reactions, string>, definitionIds: ReadonlyArray<string>): Promise<Array<Reactions>> {
    this.clearAll();

    return fetcher(`/api/words/reactions?definitionIds=${definitionIds.join(",")}`) as Promise<Array<Reactions>>;
}

const definitionsReactionsLoader = new DataLoader(fetchDefinitionsReactions);

const batchFetcher = (id: string) => (): Promise<Reactions> => (
    definitionsReactionsLoader.load(id)
);

interface ReturnType {
    likes?: number;
    isLiked: boolean;
    toggleLike: () => Promise<void>;
    dislikes?: number;
    isDisliked: boolean;
    toggleDislike: () => Promise<void>;
}

const defaultState: LoadableReactions = {
    isLiked: false,
    isDisliked: false
};

export const useReactions = (id: string): ReturnType => {
    // Even if the fetch fails, we still let the user interact with the buttons.
    const { data: reactions } = useSWR<Reactions, unknown>(
        `/api/words/${id}/reactions`,
        batchFetcher(id)
    );

    const initialState: LoadableReactions = {
        ...defaultState,
        ...reactions
    };
    const [
        {
            likes,
            isLiked,
            dislikes,
            isDisliked
        },
        dispatch
    ] = useReducer(reducer, initialState);

    // Update the state when the data is fetched.
    useEffect((): void => {
        if (!reactions) {
            return;
        }

        dispatch({
            type: "load",
            payload: reactions
        });
    }, [reactions]);

    const { enqueueErrorAlert } = useAlerts();

    const toggleLike = async (): Promise<void> => {
        dispatch({ type: "toggleLike" });

        if (isLiked) {
            const status: Status = await removeLikeAction(id);
            if (status === Status.OK || status === Status.Conflict || status === Status.NotFound) {
                return;
            }

            enqueueErrorAlert("Une erreur inconnue s'est produite.");

            return;
        }

        const status: Status = await likeAction(id);
        if (status === Status.OK || status === Status.Conflict) {
            return;
        }

        enqueueErrorAlert("Une erreur inconnue s'est produite.");
    };

    const toggleDislike = async (): Promise<void> => {
        dispatch({ type: "toggleDislike" });

        if (isDisliked) {
            const status: Status = await removeDislikeAction(id);
            if (status === Status.OK || status === Status.Conflict || status === Status.NotFound) {
                return;
            }

            enqueueErrorAlert("Une erreur inconnue s'est produite.");

            return;
        }

        const status: Status = await dislikeAction(id);
        if (status === Status.OK || status === Status.Conflict) {
            return;
        }

        enqueueErrorAlert("Une erreur inconnue s'est produite.");
    };

    return {
        likes,
        isLiked,
        toggleLike,
        dislikes,
        isDisliked,
        toggleDislike
    };
};
