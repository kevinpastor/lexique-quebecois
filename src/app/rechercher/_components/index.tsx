"use client";

import { Search as SearchIcon } from "@mui/icons-material";
import { Fade, IconButton, Modal, Paper, Tooltip } from "@mui/material";
import { ReactElement } from "react";

import { BooleanUtilities, useBoolean } from "~/hooks/use-boolean";

import { SearchContent } from "./search-content";

export const SearchPage = (): ReactElement => {
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
                hideBackdrop
            >
                <Fade in={isOpened}>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            height: "100%",
                            overflowY: "auto"
                        }}
                    >
                        <SearchContent
                            onClose={handleClose}
                            isOpened={isOpened}
                        />
                    </Paper>
                </Fade>
            </Modal>
        </div>
    );
};
