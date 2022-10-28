import { ThumbDown, ThumbDownOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ReactElement } from "react";

import { Status } from "@models/status";
import { isHttpError } from "@services/http-error";
import { dislike, removeDislike } from "@services/reactions";
import { useAlerts } from "@utils/hooks/use-alerts";
import { BooleanUtilities } from "@utils/hooks/use-boolean";
import { NumberUtilities } from "@utils/hooks/use-number";

import { LazyTooltip } from "../lazy-tooltip";

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
    const { enqueueErrorAlert } = useAlerts();

    const handleClick = async (): Promise<void> => {
        toggleIsDisliked();

        if (isDisliked) {
            decrementDislikes();

            try {
                await removeDislike(id);
            }
            catch (error: unknown) {
                if (isHttpError(error)) {
                    if (error.status === Status.Conflict || error.status === Status.NotFound) {
                        return;
                    }
                }

                enqueueErrorAlert("Un erreur inconnue s'est produite.");
            }

            return;
        }

        if (isLiked) {
            decrementLikes();
            toggleIsLiked();
        }

        incrementDislikes();

        try {
            await dislike(id);
        }
        catch (error: unknown) {
            if (isHttpError(error)) {
                if (error.status === Status.Conflict) {
                    return;
                }
            }

            enqueueErrorAlert("Un erreur inconnue s'est produite.");
        }
    };

    return (
        <LazyTooltip title="Je n'aime pas">
            <Button
                onClick={handleClick}
                aria-label="Je n'aime pas"
                startIcon={isDisliked ? <ThumbDown /> : <ThumbDownOutlined />}
                size="small"
            >
                {dislikes}
            </Button>
        </LazyTooltip>
    );
};
