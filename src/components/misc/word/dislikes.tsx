import { ThumbDown, ThumbDownOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ReactElement, useContext } from "react";

import { SnackbarsContext, ISnackbarsContext } from "@components/feedback/snackbar/context";
import { Variant } from "@components/variant";
import { isConflictError } from "@services/errors/conflict-error";
import { isNotFoundError } from "@services/errors/not-found-error";
import { dislike, removeDislike } from "@services/reactions";
import { BooleanUtilities } from "@utils/hooks/use-boolean";
import { NumberUtilities } from "@utils/hooks/use-number";

interface Props {
    id: string;
    dislikes: NumberUtilities;
    isDisliked: BooleanUtilities;
    likes: NumberUtilities;
    isLiked: BooleanUtilities;
}

export const Dislikes = ({
    id,
    dislikes: {
        value: dislikes,
        increment: incrementDislikes,
        decrement: decrementDislikes
    },
    isDisliked: {
        value: isDisliked,
        toggle: toggleIsDisliked
    },
    likes: {
        decrement: decrementLikes
    },
    isLiked: {
        value: isLiked,
        toggle: toggleIsLiked
    }
}: Props): ReactElement => {
    const { push: pushSnackbar }: ISnackbarsContext = useContext(SnackbarsContext);

    const handleClick = async (): Promise<void> => {
        toggleIsDisliked();

        if (isDisliked) {
            decrementDislikes();

            try {
                await removeDislike(id);
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
            if (isLiked) {
                decrementLikes();
                toggleIsLiked();
            }

            incrementDislikes();

            try {
                await dislike(id);
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
            aria-label="Dislike"
            startIcon={isDisliked ? <ThumbDown /> : <ThumbDownOutlined />}
        >
            {dislikes}
        </Button>
    );
};
