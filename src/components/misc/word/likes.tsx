import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useContext } from "react";

import { ToggleButton } from "@components/form/toggle-button";
import { Variant } from "@components/variant";
import { Word as IWord } from "@models/word";
import { isConflictError } from "@services/errors/conflict-error";
import { isNotFoundError } from "@services/errors/not-found-error";
import { like, removeLike } from "@services/reactions";
import { BooleanUtilities } from "@utils/hooks/use-boolean";
import { NumberUtilities } from "@utils/hooks/use-number";

import { snackbarsContext, SnackbarsContext } from "../snackbar/snackbar-context";

interface Props {
    word: IWord;
    likesNumber: NumberUtilities;
    isLikedBoolean: BooleanUtilities;
    dislikesNumber: NumberUtilities;
    isDislikedBoolean: BooleanUtilities;
}

export const Likes = ({
    word,
    likesNumber: {
        value: likes,
        increment: incrementLikes,
        decrement: decrementLikes
    },
    isLikedBoolean: {
        value: isLiked,
        toggle: toggleIsLiked
    },
    dislikesNumber: {
        decrement: decrementDislikes
    },
    isDislikedBoolean: {
        value: isDisliked,
        toggle: toggleIsDisliked
    }
}: Props): ReactElement => {
    const { push: pushSnackbar }: SnackbarsContext = useContext(snackbarsContext);

    const handleClick = async (): Promise<void> => {
        if (isLiked) {
            try {
                await removeLike(word.slug);
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

            decrementLikes();
        }
        else {
            try {
                await like(word.slug);
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

            if (isDisliked) {
                decrementDislikes();
                toggleIsDisliked();
            }
            incrementLikes();
        }

        toggleIsLiked();
    };

    return (
        <ToggleButton
            onClick={handleClick}
            label={`${likes}`}
            ariaLabel="Like"
            icon={faThumbsUp}
            isActive={isLiked}
            variant={Variant.Info}
        />
    );
};
