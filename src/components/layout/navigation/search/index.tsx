import { Search as SearchIcon } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";
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
            <IconButton
                onClick={handleOpen}
                aria-label="Rechercher"
                edge="end"
            >
                <SearchIcon />
            </IconButton>
            <Modal
                open={isOpened}
                onClose={handleClose}
            >
                <div style={{ height: "100%" }}>
                    <SearchContent onClose={handleClose} />
                </div>
            </Modal>
        </div>
    );
};
