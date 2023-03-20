import { ThumbDown, ThumbDownOutlined } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { ReactElement } from "react";

interface Props {
    dislikes: number;
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
        >
            {dislikes}
        </Button>
    </Tooltip>
);
