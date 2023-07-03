import { useEffect, useReducer } from "react";

import { Reactions } from "@models/definition";
import { Status } from "@models/status";
import { isHttpError } from "@services/http-error";
import { dislike, like, removeDislike, removeLike } from "@services/reactions";
import { useAlerts } from "@utils/hooks/use-alerts";

import { reducer } from "./reducer";

interface ReturnType {
    likes: number;
    isLiked: boolean;
    toggleLike: () => void;
    dislikes: number;
    isDisliked: boolean;
    toggleDislike: () => void;
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
