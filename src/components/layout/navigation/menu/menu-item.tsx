import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { ReactElement, ReactNode } from "react";

interface Props {
    label: ReactNode;
    href: string;
    icon: ReactNode;
    onClick: () => void;
}

export const MenuItem = ({ label, href, icon, onClick }: Props): ReactElement => (
    <ListItem disableGutters>
        <Link
            href={href}
            passHref
        >
            <ListItemButton
                component="a"
                onClick={onClick}
            >
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
            </ListItemButton>
        </Link>
    </ListItem>
);
