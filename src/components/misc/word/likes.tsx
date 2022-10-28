import { ThumbUp, ThumbUpOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ReactElement } from "react";

import { Status } from "@models/status";
import { isHttpError } from "@services/http-error";
import { like, removeLike } from "@services/reactions";
import { useAlerts } from "@utils/hooks/use-alerts";
import { BooleanUtilities } from "@utils/hooks/use-boolean";
import { NumberUtilities } from "@utils/hooks/use-number";

import { LazyTooltip } from "../lazy-tooltip";

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
    const { enqueueErrorAlert } = useAlerts();

    const handleClick = async (): Promise<void> => {
        toggleIsLiked();

        if (isLiked) {
            decrementLikes();

            try {
                await removeLike(id);
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

        if (isDisliked) {
            decrementDislikes();
            toggleIsDisliked();
        }

        incrementLikes();

        try {
            await like(id);
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
        <LazyTooltip title="J'aime">
            <Button
                onClick={handleClick}
                aria-label="J'aime"
                startIcon={isLiked ? <ThumbUp color="primary" /> : <ThumbUpOutlined />}
                size="small"
            >
                {likes}
            </Button>
        </LazyTooltip>
    );
};
