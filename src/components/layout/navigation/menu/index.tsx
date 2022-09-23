import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton, SwipeableDrawer, Tooltip } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, ReactElement } from "react";

import { useBoolean } from "@utils/hooks/use-boolean";
import { isLowEndDevice } from "@utils/misc/device";

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
            <Tooltip title="Menu">
                <IconButton
                    onClick={handleOpen}
                    aria-label="Menu"
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
            </Tooltip>
            <SwipeableDrawer
                open={isOpened}
                onOpen={handleOpen}
                onClose={handleClose}
                disableBackdropTransition={isLowEndDevice}
                disableSwipeToOpen // Interferes with the navigation menu button.
                ModalProps={{
                    keepMounted: true
                }}
            >
                <MenuContent onClose={handleClose} />
            </SwipeableDrawer>
        </>
    );
};