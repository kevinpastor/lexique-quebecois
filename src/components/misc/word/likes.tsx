import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useContext } from "react";

import { ToggleButton } from "@components/form/toggle-button";
import { Variant } from "@components/variant";
import { Word as IWord } from "@models/word";
import { isConflictError } from "@services/errors/conflict-error";
import { isNotFoundError } from "@services/errors/not-found-error";
import { like, removeLike } from "@services/words";
import { useBoolean } from "@utils/hooks/use-boolean";
import { useNumber } from "@utils/hooks/use-number";

import { snackbarsContext, SnackbarsContext } from "../snackbar/snackbar-context";

interface Props {
    word: IWord;
}

export const Likes = ({ word }: Props): ReactElement => {
    const {
        value: likes,
        increment: incrementLikes,
        decrement: decrementLikes
    } = useNumber(word.likes);

    const {
        value: isLiked,
        toggle: toggleIsLiked
    } = useBoolean(word.isLiked);

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
