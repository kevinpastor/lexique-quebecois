/* eslint-disable react/no-unused-prop-types */
import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import LinkComponent from "next/link";

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
    }
];

export const Footer = (): ReactElement => (
    <footer className="container mx-auto space-y-2">
        <div className="flex justify-center items-center space-x-4">
            {links.map(({ label, href }: Link): ReactElement => (
                <LinkComponent
                    key={href}
                    href={href}
                >
                    <a className="text-slate-500 hover:text-slate-400 transition font-bold">
                        {label}
                    </a>
                </LinkComponent>
            ))}
        </div>
        <div className="text-center text-slate-500 font-bold space-x-2">
            <FontAwesomeIcon icon={faCopyright} />
            <span>
                2022 Lexique Québécois
            </span>
        </div>
    </footer>
);
