import { Search as SearchIcon } from "@mui/icons-material";
import { Fade, IconButton, Modal } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, ReactElement, Suspense } from "react";

import { LazyTooltip } from "@components/misc/lazy-tooltip";
import { useBoolean } from "@utils/hooks/use-boolean";

import type { Props as SearchContentProps } from "./content";

const LazySearchContent = dynamic(async (): Promise<{ default: ComponentType<SearchContentProps> }> => ({
    default: (await import("./content")).Content
}), { suspense: true });

export const Search = (): ReactElement => {
    const {
        value: isOpened,
        setTrue: handleOpen,
        setFalse: handleClose
    } = useBoolean(false);

    // Wrapping div required for IconButton end edge
    return (
        <div>
            <LazyTooltip title="Rechercher">
                <IconButton
                    onClick={handleOpen}
                    aria-label="Rechercher"
                    edge="end"
                >
                    <SearchIcon />
                </IconButton>
            </LazyTooltip>
            <Modal
                open={isOpened}
                onClose={handleClose}
                keepMounted
            >
                <Fade in={isOpened}>
                    <div style={{ height: "100%" }}>
                        <Suspense>
                            <LazySearchContent onClose={handleClose} />
                        </Suspense>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};
