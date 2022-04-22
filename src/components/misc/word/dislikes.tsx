import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useContext } from "react";

import { ToggleButton } from "@components/form/toggle-button";
import { Variant } from "@components/variant";
import { isConflictError } from "@services/errors/conflict-error";
import { isNotFoundError } from "@services/errors/not-found-error";
import { dislike, removeDislike } from "@services/reactions";
import { BooleanUtilities } from "@utils/hooks/use-boolean";
import { NumberUtilities } from "@utils/hooks/use-number";

import { snackbarsContext, SnackbarsContext } from "../snackbar/context";

interface Props {
    slug: string;
    dislikes: NumberUtilities;
    isDisliked: BooleanUtilities;
    likes: NumberUtilities;
    isLiked: BooleanUtilities;
}

export const Dislikes = ({
    slug,
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
    const { push: pushSnackbar }: SnackbarsContext = useContext(snackbarsContext);

    const handleClick = async (): Promise<void> => {
        toggleIsDisliked();

        if (isDisliked) {
            decrementDislikes();

            try {
                await removeDislike(slug);
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
                await dislike(slug);
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
