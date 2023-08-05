import DataLoader from "dataloader";
import { useEffect, useReducer } from "react";
import useSWR from "swr";

import { fetcher } from "~/app/_components/providers/swr-provider/fetcher";
import { useAlerts } from "~/hooks/use-alerts";
import { type Reactions } from "~/types/definition";
import { Status } from "~/types/status";
import { isHttpError } from "~/utils/http-error";

import { dislike, like, removeDislike, removeLike } from "./reactions";
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
    const { data: reactions, mutate } = useSWR<Reactions, unknown>(
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

    // Update the fetch cache when the state changes.
    useEffect((): void => {
        if (likes === undefined || dislikes === undefined) {
            return;
        }

        void mutate({
            likes,
            isLiked,
            dislikes,
            isDisliked
        });
    }, [dislikes, isDisliked, isLiked, likes, mutate]);

    const { enqueueErrorAlert } = useAlerts();

    const toggleLike = async (): Promise<void> => {
        dispatch({ type: "toggleLike" });

        if (isLiked) {
            try {
                await removeLike(id);
            }
            catch (error: unknown) {
                if (isHttpError(error) && (error.status === Status.Conflict || error.status === Status.NotFound)) {
                    return;
                }

                enqueueErrorAlert("Une erreur inconnue s'est produite.");
            }

            return;
        }

        try {
            await like(id);
        }
        catch (error: unknown) {
            if (isHttpError(error) && (error.status === Status.Conflict)) {
                return;
            }

            enqueueErrorAlert("Une erreur inconnue s'est produite.");
        }
    };

    const toggleDislike = async (): Promise<void> => {
        dispatch({ type: "toggleDislike" });

        if (isDisliked) {
            try {
                await removeDislike(id);
            }
            catch (error: unknown) {
                if (isHttpError(error) && (error.status === Status.Conflict || error.status === Status.NotFound)) {
                    return;
                }

                enqueueErrorAlert("Une erreur inconnue s'est produite.");
            }

            return;
        }

        try {
            await dislike(id);
        }
        catch (error: unknown) {
            if (isHttpError(error) && (error.status === Status.Conflict)) {
                return;
            }

            enqueueErrorAlert("Une erreur inconnue s'est produite.");
        }
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
