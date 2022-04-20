import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useContext } from "react";

import { ToggleButton } from "@components/form/toggle-button";
import { Variant } from "@components/variant";
import { Word as IWord } from "@models/word";
import { isConflictError } from "@services/errors/conflict-error";
import { isNotFoundError } from "@services/errors/not-found-error";
import { dislike, removeDislike } from "@services/reactions";
import { BooleanUtilities } from "@utils/hooks/use-boolean";
import { NumberUtilities } from "@utils/hooks/use-number";

import { snackbarsContext, SnackbarsContext } from "../snackbar/snackbar-context";

interface Props {
    word: IWord;
    dislikesNumber: NumberUtilities;
    isDislikedBoolean: BooleanUtilities;
    likesNumber: NumberUtilities;
    isLikedBoolean: BooleanUtilities;
}

export const Dislikes = ({
    word,
    dislikesNumber: {
        value: dislikes,
        increment: incrementDislikes,
        decrement: decrementDislikes
    },
    isDislikedBoolean: {
        value: isDisliked,
        toggle: toggleIsDisliked
    },
    likesNumber: {
        decrement: decrementLikes
    },
    isLikedBoolean: {
        value: isLiked,
        toggle: toggleIsLiked
    }
}: Props): ReactElement => {
    const { push: pushSnackbar }: SnackbarsContext = useContext(snackbarsContext);

    const handleClick = async (): Promise<void> => {
        if (isDisliked) {
            try {
                await removeDislike(word.slug);
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

            decrementDislikes();
        }
        else {
            try {
                await dislike(word.slug);
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

            if (isLiked) {
                decrementLikes();
                toggleIsLiked();
            }

            incrementDislikes();
        }

        toggleIsDisliked();
    };

    return (
        <ToggleButton
            onClick={handleClick}
            label={`${dislikes}`}
            ariaLabel="Dislike"
            icon={faThumbsDown}
            isActive={isDisliked}
            variant={Variant.Error}
        />
    );
};
