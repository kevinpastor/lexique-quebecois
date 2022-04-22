import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useContext } from "react";

import { ToggleButton } from "@components/form/toggle-button";
import { Variant } from "@components/variant";
import { isConflictError } from "@services/errors/conflict-error";
import { isNotFoundError } from "@services/errors/not-found-error";
import { like, removeLike } from "@services/reactions";
import { BooleanUtilities } from "@utils/hooks/use-boolean";
import { NumberUtilities } from "@utils/hooks/use-number";

import { snackbarsContext, SnackbarsContext } from "../snackbar/context";

interface Props {
    slug: string;
    likes: NumberUtilities;
    isLiked: BooleanUtilities;
    dislikes: NumberUtilities;
    isDisliked: BooleanUtilities;
}

export const Likes = ({
    slug,
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
    const { push: pushSnackbar }: SnackbarsContext = useContext(snackbarsContext);

    const handleClick = async (): Promise<void> => {
        toggleIsLiked();

        if (isLiked) {
            decrementLikes();

            try {
                await removeLike(slug);
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
                await like(slug);
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
            label={`${likes}`}
            ariaLabel="Like"
            icon={faThumbsUp}
            isActive={isLiked}
            variant={Variant.Info}
        />
    );
};
