import { useEffect, useReducer } from "react";

import { useAlerts } from "~hooks/use-alerts";
import { Reactions } from "~types/definition";
import { Status } from "~types/status";
import { isHttpError } from "~utils/http-error";

import { dislike, like, removeDislike, removeLike } from "./reactions";
import { reducer } from "./reducer";

interface ReturnType {
    likes: number;
    isLiked: boolean;
    toggleLike: () => Promise<void>;
    dislikes: number;
    isDisliked: boolean;
    toggleDislike: () => Promise<void>;
}

export const useReactions = (id: string, reactions: Reactions): ReturnType => {
    const [
        {
            likes,
            isLiked,
            dislikes,
            isDisliked
        },
        dispatch
    ] = useReducer(reducer, reactions);

    // Update the state if the external value changes.
    useEffect((): void => {
        dispatch({
            type: "reset",
            payload: reactions
        });
    }, [reactions]);

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