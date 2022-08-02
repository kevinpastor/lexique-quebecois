import { ThumbUp, ThumbUpOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ReactElement, useContext } from "react";

import { SnackbarsContext, ISnackbarsContext } from "@components/feedback/snackbar/context";
import { Variant } from "@components/variant";
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
    const { push: pushSnackbar }: ISnackbarsContext = useContext(SnackbarsContext);

    const handleClick = async (): Promise<void> => {
        toggleIsLiked();

        if (isLiked) {
            decrementLikes();

            try {
                await removeLike(id);
            }
            catch (error: unknown) {
                if (!isConflictError(error) && !isNotFoundError(error)) {
                    pushSnackbar({
                        label: "Un erreur inconnue s'est produite.",
                        variant: Variant.Error
                    });
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
                    pushSnackbar({
                        label: "Un erreur inconnue s'est produite.",
                        variant: Variant.Error
                    });
                    return;
                }
            }
        }
    };

    return (
        <Button
            onClick={handleClick}
            aria-label="Like"
            // TODO
            // eslint-disable-next-line react/forbid-component-props
            startIcon={isLiked ? <ThumbUp className="text-amber-500" /> : <ThumbUpOutlined />}
        >
            {likes}
        </Button>
    );
};
