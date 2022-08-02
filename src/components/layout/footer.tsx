import { Link, Typography } from "@mui/material";
import LinkComponent from "next/link";
import { ReactElement } from "react";

/* eslint-disable react/no-unused-prop-types */
interface ILink {
    label: string;
    href: string;
}

const links: Array<ILink> = [
    {
        label: "Conditions",
        href: "/conditions"
    },
    {
        label: "Confidentialité",
        href: "/confidentialite"
    },
    {
        label: "Index",
        href: "/mots"
    }
];

export const Footer = (): ReactElement => (
    <footer className="container mx-auto space-y-2">
        <div className="flex justify-center items-center gap-x-4 gap-y-2 flex-wrap">
            {links.map(({ label, href }: ILink): ReactElement => (
                <LinkComponent
                    key={href}
                    href={href}
                    passHref
                >
                    <Link variant="subtitle2">
                        {label}
                    </Link>
                </LinkComponent>
            ))}
        </div>
        <Typography
            align="center"
            variant="subtitle2"
        >
            &copy; 2022 Lexique Québécois
        </Typography>
    </footer>
);
