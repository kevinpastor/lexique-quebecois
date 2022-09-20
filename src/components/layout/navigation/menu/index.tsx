import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton, SwipeableDrawer } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, ReactElement } from "react";

import { useBoolean } from "@utils/hooks/use-boolean";
import { isIOS, isMacOS, isWindows } from "@utils/misc/device";

import type { Props as MenuContentProps } from "./menu-content";

const MenuContent = dynamic(async (): Promise<ComponentType<MenuContentProps>> => (
    (await import("./menu-content")).MenuContent)
);

export const Menu = (): ReactElement => {
    const {
        value: isOpened,
        setTrue: handleOpen,
        setFalse: handleClose
    } = useBoolean(false);

    return (
        <>
            <IconButton
                onClick={handleOpen}
                aria-label="Menu"
                edge="start"
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
