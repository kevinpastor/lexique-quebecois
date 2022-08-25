import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton, SwipeableDrawer } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, ReactElement, useState } from "react";

import { isIOS, isMacOS, isWindows } from "@utils/misc/device";

import type { Props as MenuContentProps } from "./menu-content";

const MenuContent = dynamic(async (): Promise<ComponentType<MenuContentProps>> => (
    (await import("./menu-content")).MenuContent)
);

export const Menu = (): ReactElement => {
    const [isOpened, setIsOpened] = useState(false);

    const handleOpen = (): void => {
        setIsOpened(true);
    };

    const handleClose = (): void => {
        setIsOpened(false);
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                aria-label="Menu"
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                open={isOpened}
                onOpen={handleOpen}
                onClose={handleClose}
                disableBackdropTransition={!isIOS && !isWindows && !isMacOS}
                disableDiscovery={isIOS}
            >
                <MenuContent onClose={handleClose} />
            </SwipeableDrawer>
        </>
    );
};
