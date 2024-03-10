"use client";

import { Menu as MenuIcon } from "@mui/icons-material";
import { Box, IconButton, SwipeableDrawer, Tooltip } from "@mui/material";
import dynamic from "next/dynamic";
import { type ComponentType, type ReactNode, Suspense } from "react";

import { type BooleanUtilities, useBoolean } from "~/hooks/use-boolean";
import { isLowEndDevice } from "~/utils/misc/device/is-low-end-device";

import { type MenuContentProps } from "./menu-content";

const LazyMenuContent = dynamic(async (): Promise<{ default: ComponentType<MenuContentProps> }> => ({
    default: (await import("./menu-content")).MenuContent
}));

export const Menu = (): ReactNode => {
    const {
        value: isOpened,
        setTrue: handleOpen,
        setFalse: handleClose
    }: BooleanUtilities = useBoolean(false);

    return (
        <>
            <Box
                sx={{
                    display: {
                        md: "none"
                    }
                }}
            >
                <Tooltip title="Menu">
                    <IconButton
                        onClick={handleOpen}
                        aria-label="Menu"
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
            </Box>
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
