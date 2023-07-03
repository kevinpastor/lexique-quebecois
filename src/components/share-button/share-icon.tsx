import { IosShare as IosShareIcon, Link as DesktopShareIcon, Share as AndroidShareIcon } from "@mui/icons-material";
import { Fade } from "@mui/material";
import { ReactElement } from "react";

import { useHasClientLoaded } from "@hooks/use-has-client-loaded";
import { usePlatformVariant } from "@hooks/use-platform-variant";

export const ShareIcon = (): ReactElement => {
    const hasClientLoaded: boolean = useHasClientLoaded();
    const Icon = usePlatformVariant(IosShareIcon, IosShareIcon, AndroidShareIcon, DesktopShareIcon);

    return (
        <Fade in={hasClientLoaded}>
            <Icon />
        </Fade>
    );
};
