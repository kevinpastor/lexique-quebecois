import { Search as SearchIcon } from "@mui/icons-material";
import { Fade, IconButton, Modal, Tooltip } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, ReactElement } from "react";

import { useBoolean } from "@utils/hooks/use-boolean";

import type { Props as SearchContentProps } from "./content";

const SearchContent = dynamic(async (): Promise<ComponentType<SearchContentProps>> => (
    (await import("./content")).Content)
);

export const Search = (): ReactElement => {
    const {
        value: isOpened,
        setTrue: handleOpen,
        setFalse: handleClose
    } = useBoolean(false);

    // Wrapping div required for IconButton end edge
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
                        <SearchContent onClose={handleClose} />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};
