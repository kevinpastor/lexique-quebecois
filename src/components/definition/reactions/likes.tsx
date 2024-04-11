import { ThumbUp, ThumbUpOutlined } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { type ReactNode } from "react";

import { CrossfadeLoad } from "../loading-count";

interface Props {
    likes?: number;
    isLiked: boolean;
    toggleLike: (() => void) | (() => Promise<void>);
}

export const Likes = ({
    likes,
    isLiked,
    toggleLike
}: Props): ReactNode => (
    <Tooltip title="J'aime">
        <Button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={toggleLike}
            aria-label="J'aime"
            startIcon={
                isLiked
                    ? <ThumbUp color="primary" />
                    : <ThumbUpOutlined />
            }
            size="small"
            aria-busy={likes === undefined}
            style={{ overflow: "hidden" }}
        >
            <CrossfadeLoad value={likes} />
        </Button>
    </Tooltip>
);
