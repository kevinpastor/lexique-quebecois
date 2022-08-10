import { ThumbUp, ThumbUpOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactElement } from "react";

import { isConflictError } from "@services/errors/conflict-error";
import { isNotFoundError } from "@services/errors/not-found-error";
import { like, removeLike } from "@services/reactions";
import { BooleanUtilities } from "@utils/hooks/use-boolean";
import { NumberUtilities } from "@utils/hooks/use-number";

interface Props {
    id: string;
    likes: NumberUtilities;
    isLiked: BooleanUtilities;
    dislikes: NumberUtilities;
    isDisliked: BooleanUtilities;
}

export const Likes = ({
    id,
    likes: {
        value: likes,
        increment: incrementLikes,
        decrement: decrementLikes
    },
    isLiked: {
        value: isLiked,
        toggle: toggleIsLiked
    },
    dislikes: {
        decrement: decrementDislikes
    },
    isDisliked: {
        value: isDisliked,
        toggle: toggleIsDisliked
    }
}: Props): ReactElement => {
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = async (): Promise<void> => {
        toggleIsLiked();

        if (isLiked) {
            decrementLikes();

            try {
                await removeLike(id);
            }
            catch (error: unknown) {
                if (!isConflictError(error) && !isNotFoundError(error)) {
                    enqueueSnackbar(
                        "Un erreur inconnue s'est produite.",
                        { variant: "error" }
                    );
                    return;
                }
            }
        }
        else {
            if (isDisliked) {
                decrementDislikes();
                toggleIsDisliked();
            }

            incrementLikes();

            try {
                await like(id);
            }
            catch (error: unknown) {
                if (!isConflictError(error)) {
                    enqueueSnackbar(
                        "Un erreur inconnue s'est produite.",
                        { variant: "error" }
                    );
                    return;
                }
            }
        }
    };

    return (
        <Button
            onClick={handleClick}
            aria-label="Like"
            startIcon={isLiked ? <ThumbUp color="primary" /> : <ThumbUpOutlined />}
            size="small"
        >
            {likes}
        </Button>
    );
};
