import { IosShare, Link, Share, type SvgIconComponent } from "@mui/icons-material";

import { PlatformName, usePlatformName } from "~/app/_components/providers/platform-provider";

export const useShareIcon = (): SvgIconComponent => {
    const platformName: PlatformName | undefined = usePlatformName();

    if (platformName === undefined || platformName === PlatformName.Unknown) {
        return IosShare;
    }

    if (platformName === PlatformName.iOS) {
        return IosShare;
    }

    if (platformName === PlatformName.Android) {
        return Share;
    }

    return Link;
};
