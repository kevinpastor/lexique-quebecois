import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton, SwipeableDrawer } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, ReactElement, Suspense } from "react";

import { LazyTooltip } from "@components/misc/lazy-tooltip";
import { useBoolean } from "@utils/hooks/use-boolean";
import { isLowEndDevice } from "@utils/misc/device";

import type { Props as MenuContentProps } from "./menu-content";

const LazyMenuContent = dynamic(async (): Promise<{ default: ComponentType<MenuContentProps> }> => ({
    default: (await import("./menu-content")).MenuContent
}), { suspense: true });

export const Menu = (): ReactElement => {
    const {
        value: isOpened,
        setTrue: handleOpen,
        setFalse: handleClose
    } = useBoolean(false);

    return (
        <>
            <LazyTooltip title="Menu">
                <IconButton
                    onClick={handleOpen}
                    aria-label="Menu"
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
            </LazyTooltip>
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
                <Suspense>
                    <LazyMenuContent onClose={handleClose} />
                </Suspense>
            </SwipeableDrawer>
        </>
    );
};
