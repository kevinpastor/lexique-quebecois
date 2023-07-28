import { ThumbDown, ThumbDownOutlined } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { ReactElement } from "react";

import { CrossfadeLoad } from "./loading-count";

interface Props {
    dislikes?: number;
    isDisliked: boolean;
    toggleDislike: () => void;
}

export const Dislikes = ({
    dislikes,
    isDisliked,
    toggleDislike
}: Props): ReactElement => (
    <Tooltip title="Je n'aime pas">
        <Button
            onClick={toggleDislike}
            aria-label="Je n'aime pas"
            startIcon={
                isDisliked
                    ? <ThumbDown />
                    : <ThumbDownOutlined />
            }
            size="small"
            aria-busy={dislikes === undefined}
            style={{ overflow: "hidden" }}
        >
            <CrossfadeLoad value={dislikes} />
        </Button>
    </Tooltip>
);
