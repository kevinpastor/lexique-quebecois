"use client";

import { Button } from "@mui/material";
import { type ReactNode } from "react";

import { useShare } from "~/hooks/use-share";

import { ShareIcon } from "./share-icon";

interface Props {
    url: string;
}

export const ShareButton = ({ url }: Props): ReactNode => {
    const share = useShare(url);

    return (
        <Button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={share}
            startIcon={<ShareIcon />}
            size="small"
        >
            Partager
        </Button>
    );
};
