import { Link } from "@mui/material";
import { type ReactNode } from "react";

export enum EmailType {
    Info = "info",
    Support = "support",
    Legal = "legal"
}

interface Props {
    type: EmailType;
}

// TODO Add more email addresses
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Email = ({ type }: Props): ReactNode => (
    <Link href="mailto:info@lexiquequebecois.com">
        info@lexiquequebecois.com
    </Link>
);
