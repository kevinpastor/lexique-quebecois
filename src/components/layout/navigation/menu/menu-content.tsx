import { Add, Home, ListAlt, LocalLibrary } from "@mui/icons-material";
import { Box, Divider, List, ListItem, Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

import { MenuItem } from "./menu-item";
import { Theme } from "./theme";

export interface Props {
    onClose: () => void;
}

export const MenuContent = ({ onClose: handleClose }: Props): ReactElement => (
    <Box
        p={2}
        width={256}
    >
        <Stack
            my={2}
            spacing={1}
            alignItems="center"
        >
            <LocalLibrary fontSize="large" />
            <Typography
                variant="h3"
                align="center"
            >
                Lexique Québecois
            </Typography>
        </Stack>
        <Divider />
        <List>
            <MenuItem
                label="Accueil"
                href="/"
                icon={<Home />}
                onClick={handleClose}
            />
            <MenuItem
                label="Ajouter"
                href="/ajouter"
                icon={<Add />}
                onClick={handleClose}
            />
            <MenuItem
                label="Index"
                href="/mots"
                icon={<ListAlt />}
                onClick={handleClose}
            />
        </List>
        {/*
        <Divider />
        <List>
            // TODO Create both pages
            <MenuItem
                label="Contact"
                href="/contact"
                icon={<ChatBubble />}
                onClick={handleClose}
            />
            <MenuItem
                label="Contribuer"
                href="/contribuer"
                icon={<AttachMoney />}
                onClick={handleClose}
            />
        </List>
        */}
        <Divider />
        <List>
            <ListItem disableGutters>
                <Theme />
            </ListItem>
        </List>
    </Box>
);
