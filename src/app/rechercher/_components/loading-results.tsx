import { Container, List, ListItem, ListItemButton, Skeleton } from "@mui/material";
import { type ReactNode } from "react";

export const LoadingResults = (): ReactNode => (
    <Container>
        <List>
            <ListItem disablePadding>
                <ListItemButton disabled>
                    <Skeleton
                        variant="text"
                        width={125}
                    />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton disabled>
                    <Skeleton
                        variant="text"
                        width={100}
                    />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton disabled>
                    <Skeleton
                        variant="text"
                        width={150}
                    />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton disabled>
                    <Skeleton
                        variant="text"
                        width={130}
                    />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton disabled>
                    <Skeleton
                        variant="text"
                        width={120}
                    />
                </ListItemButton>
            </ListItem>
        </List>
    </Container>
);
