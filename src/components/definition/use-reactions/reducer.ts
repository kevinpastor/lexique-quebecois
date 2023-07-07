import { Reactions } from "~/types/definition";

const toggleLike = (state: Reactions): Reactions => {
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

const toggleDislike = (state: Reactions): Reactions => {
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

type Action = ToggleLikeAction | ToggleDislikeAction | ResetAction;

export const reducer = (state: Reactions, action: Action): Reactions => {
    switch (action.type) {
        case "reset": {
            return action.payload;
        }

        case "toggleLike": {
            return toggleLike(state);
        }

        case "toggleDislike": {
            return toggleDislike(state);
        }
    }
};
