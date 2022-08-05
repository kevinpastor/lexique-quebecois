import { Search as SearchIcon } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";
import dynamic from "next/dynamic";
import { ComponentType, ReactElement, useState } from "react";

import type { Props as SearchContentProps } from "./search-content";

const SearchContent = dynamic(async (): Promise<ComponentType<SearchContentProps>> => (
    (await import("./search-content")).SearchContent)
);

export const Search = (): ReactElement => {
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
                aria-label="Rechercher"
            >
                <SearchIcon />
            </IconButton>
            <Modal
                open={isOpened}
                onClose={handleClose}
            >
                <div>
                    <SearchContent onClose={handleClose} />
                </div>
            </Modal>
        </>
    );
};
