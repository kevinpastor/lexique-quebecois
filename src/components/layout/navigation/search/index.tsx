import { Search as SearchIcon } from "@mui/icons-material";
import { Fade, IconButton, Modal, Tooltip } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, ReactElement, Suspense } from "react";

import { BooleanUtilities, useBoolean } from "@utils/hooks/use-boolean";

import type { SearchContentProps } from "./search-content";

const LazySearchContent = dynamic(async (): Promise<{ default: ComponentType<SearchContentProps> }> => ({
    default: (await import("./search-content")).SearchContent
}));

export const Search = (): ReactElement => {
    const {
        value: isOpened,
        setTrue: handleOpen,
        setFalse: handleClose
    }: BooleanUtilities = useBoolean(false);

    // Wrapping div required for IconButton end edge on desktop.
    return (
        <div>
            <Tooltip title="Rechercher">
                <IconButton
                    onClick={handleOpen}
                    aria-label="Rechercher"
                    edge="end"
                >
                    <SearchIcon />
                </IconButton>
            </Tooltip>
            <Modal
                open={isOpened}
                onClose={handleClose}
                keepMounted
            >
                <Fade in={isOpened}>
                    <div style={{ height: "100%" }}>
                        <Suspense>
                            <LazySearchContent
                                onClose={handleClose}
                                isOpened={isOpened}
                            />
                        </Suspense>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};
