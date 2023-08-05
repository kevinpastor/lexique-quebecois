import { IosShare as IosShareIcon, Link as DesktopShareIcon, Share as AndroidShareIcon, SvgIconComponent } from "@mui/icons-material";

import { PlatformName, usePlatformName } from "~/app/_components/providers/platform-provider";

export const useShareIcon = (): SvgIconComponent => {
    const platformName: PlatformName | undefined = usePlatformName();

    if (platformName === undefined || platformName === PlatformName.Unknown) {
        return IosShareIcon;
    }

    if (platformName === PlatformName.iOS) {
        return IosShareIcon;
    }

    if (platformName === PlatformName.Android) {
        return AndroidShareIcon;
    }

    return DesktopShareIcon;
};
