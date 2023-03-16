import { Button } from "@mui/material";
import { ReactElement } from "react";

import { useShare } from "@utils/hooks/use-share";

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
