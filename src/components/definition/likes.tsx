import { ThumbUp, ThumbUpOutlined } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { ReactElement } from "react";

interface Props {
    likes?: number;
    isLiked: boolean;
    toggleLike: () => void;
}

export const Likes = ({
    likes,
    isLiked,
    toggleLike
}: Props): ReactElement => (
    <Tooltip title="J'aime">
        <Button
            onClick={toggleLike}
            aria-label="J'aime"
            startIcon={
                isLiked
                    ? <ThumbUp color="primary" />
                    : <ThumbUpOutlined />
            }
            size="small"
            aria-busy={likes === undefined}
        >
            {likes === undefined ? "–" : likes}
        </Button>
    </Tooltip>
);
