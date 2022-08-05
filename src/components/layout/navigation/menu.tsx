import { Add, AttachMoney, ChatBubble, Description, Home, ListAlt, LocalLibrary, Menu as MenuIcon, PrivacyTip } from "@mui/icons-material";
import { Box, Divider, IconButton, List, Stack, SwipeableDrawer, Typography } from "@mui/material";
import { ReactElement, useState } from "react";

import { MenuItem } from "./menu-item";

export const Menu = (): ReactElement => {
    const [isOpened, setIsOpened] = useState(false);

    const handleOpen = (): void => {
        setIsOpened(true);
    };

    const handleClose = (): void => {
        setIsOpened(false);
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                open={isOpened}
                onOpen={handleOpen}
                onClose={handleClose}
            >
                <Box
                    p={2}
                    width={256} // TODO Have it wider on desktop
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
                    <Divider />
                    <List>
                        <MenuItem
                            label="Conditions"
                            href="/conditions"
                            icon={<Description />}
                            onClick={handleClose}
                        />
                        <MenuItem
                            label="Confidentialité"
                            href="/confidentialite"
                            icon={<PrivacyTip />}
                            onClick={handleClose}
                        />
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
                </Box>
            </SwipeableDrawer>
        </>
    );
};
