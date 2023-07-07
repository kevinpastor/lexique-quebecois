"use client";

import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton, SwipeableDrawer, Tooltip } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, ReactElement, Suspense } from "react";

import { BooleanUtilities, useBoolean } from "~/hooks/use-boolean";
import { isLowEndDevice } from "~/utils/misc/device";

import type { MenuContentProps } from "./menu-content";

const LazyMenuContent = dynamic(async (): Promise<{ default: ComponentType<MenuContentProps> }> => ({
    default: (await import("./menu-content")).MenuContent
}));

export const Menu = (): ReactElement => {
    const {
        value: isOpened,
        setTrue: handleOpen,
        setFalse: handleClose
    }: BooleanUtilities = useBoolean(false);

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
                disableBackdropTransition={isLowEndDevice()}
                disableSwipeToOpen // Interferes with the navigation menu button.
                ModalProps={{
                    keepMounted: true
                }}
            >
                <Suspense>
                    <LazyMenuContent onClose={handleClose} />
                </Suspense>
            </SwipeableDrawer>
        </>
    );
};
