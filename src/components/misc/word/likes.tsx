import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";

import { ToggleButton } from "@components/form/toggle-button";
import { Variant } from "@components/variant";
import { Word as IWord } from "@models/word";
import { like, removeLike } from "@services/words";
import { useBoolean } from "@utils/hooks/use-boolean";
import { useNumber } from "@utils/hooks/use-number";

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

    const handleClick = async (): Promise<void> => {
        try {
            if (isLiked) {
                await removeLike(word.slug);
            }
            else {
                await like(word.slug);
            }
        }
        catch {
            // TODO
            return;
        }

        if (isLiked) {
            decrementLikes();
        }
        else {
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
