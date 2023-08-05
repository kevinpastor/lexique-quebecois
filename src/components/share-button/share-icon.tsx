import { SvgIconComponent } from "@mui/icons-material";
import { AnimatePresence, m } from "framer-motion";
import { ReactElement } from "react";

import { PlatformName, usePlatformName } from "~/app/_components/providers/platform-provider";

import { useShareIcon } from "./use-share-icon";

export const ShareIcon = (): ReactElement => {
    const platformName: PlatformName | undefined = usePlatformName();
    const Icon: SvgIconComponent = useShareIcon();

    return (
        <AnimatePresence initial={platformName === undefined}>
            <Icon
                component={m.svg}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
        </AnimatePresence>
    );
};
