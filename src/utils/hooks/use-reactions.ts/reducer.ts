import { Reactions } from "@models/definition";

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

export const reducer = (state: Reactions, action: "toggleLike" | "toggleDislike"): Reactions => {
    switch (action) {
        case "toggleLike": {
            return toggleLike(state);
        }

        case "toggleDislike": {
            return toggleDislike(state);
        }
    }
};
