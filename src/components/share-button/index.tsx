"use client";

import { Button } from "@mui/material";
import { type ReactElement } from "react";

import { useShare } from "~/hooks/use-share";

import { ShareIcon } from "./share-icon";

interface Props {
    url: string;
}

export const ShareButton = ({ url }: Props): ReactElement => {
    const share = useShare(url);

    return (
        <Button
            onClick={share}
            startIcon={<ShareIcon />}
            size="small"
        >
            Partager
        </Button>
    );
};
