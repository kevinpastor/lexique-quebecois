import { type Reactions } from "~/types/definition";

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type LoadableReactions = Optional<Reactions, "likes" | "dislikes">;

const hasLoaded = (state: LoadableReactions): state is Reactions => (
    state.likes !== undefined && state.dislikes !== undefined
);

const load = (state: LoadableReactions, payload: Reactions): LoadableReactions => {
    if (
        payload.likes === state.likes
        && payload.isLiked === state.isLiked
        && payload.dislikes === state.dislikes
        && payload.isDisliked === state.isDisliked
    ) {
        // This avoids an unnecessary render when the payload matches.
        return state;
    }

    return {
        likes: payload.likes,
        isLiked: payload.isLiked,
        dislikes: payload.dislikes,
        isDisliked: payload.isDisliked
    };
};

const toggleLike = (state: LoadableReactions): LoadableReactions => {
    if (!hasLoaded(state)) {
        if (state.isLiked) {
            return {
                ...state,
                isLiked: false
            };
        }

        if (state.isDisliked) {
            return {
                ...state,
                isLiked: true,
                isDisliked: false
            };
        }

        return {
            ...state,
            isLiked: true
        };
    }

    if (state.isLiked) {
        return {
            ...state,
            likes: state.likes - 1,
            isLiked: false
        };
    }

    if (state.isDisliked) {
        return {
            ...state,
            likes: state.likes + 1,
            dislikes: state.dislikes - 1,
            isLiked: true,
            isDisliked: false
        };
    }

    return {
        ...state,
        likes: state.likes + 1,
        isLiked: true
    };
};

const toggleDislike = (state: LoadableReactions): LoadableReactions => {
    if (!hasLoaded(state)) {
        if (state.isDisliked) {
            return {
                ...state,
                isDisliked: false
            };
        }

        if (state.isLiked) {
            return {
                ...state,
                isLiked: false,
                isDisliked: true
            };
        }

        return {
            ...state,
            isDisliked: true
        };
    }

    if (state.isDisliked) {
        return {
            ...state,
            dislikes: state.dislikes - 1,
            isDisliked: false
        };
    }

    if (state.isLiked) {
        return {
            ...state,
            likes: state.likes - 1,
            dislikes: state.dislikes + 1,
            isLiked: false,
            isDisliked: true
        };
    }

    return {
        ...state,
        dislikes: state.dislikes + 1,
        isDisliked: true
    };
};

interface ToggleLikeAction {
    type: "toggleLike";
}

interface ToggleDislikeAction {
    type: "toggleDislike";
}

interface ResetAction {
    type: "reset";
    payload: Reactions;
}

interface LoadAction {
    type: "load";
    payload: Reactions;
}

type Action = ToggleLikeAction | ToggleDislikeAction | LoadAction | ResetAction;

export const reducer = (state: LoadableReactions, action: Action): LoadableReactions => {
    switch (action.type) {
        case "reset": {
            return action.payload;
        }

        case "load": {
            return load(state, action.payload);
        }

        case "toggleLike": {
            return toggleLike(state);
        }

        case "toggleDislike": {
            return toggleDislike(state);
        }
    }
};
