/* eslint-disable react/no-unused-prop-types */
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkComponent from "next/link";
import { ReactElement } from "react";

interface Link {
    label: string;
    href: string;
}

const links: Array<Link> = [
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
            {links.map(({ label, href }: Link): ReactElement => (
                <LinkComponent
                    key={href}
                    href={href}
                >
                    <a className="text-black/[.60] hover:text-black/[.87] transition font-bold">
                        {label}
                    </a>
                </LinkComponent>
            ))}
        </div>
        <div className="text-center text-black/[.60] font-bold space-x-2">
            <FontAwesomeIcon icon={faCopyright} />
            <span>
                2022 Lexique Québécois
            </span>
        </div>
    </footer>
);
