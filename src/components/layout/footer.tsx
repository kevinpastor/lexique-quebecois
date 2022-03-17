import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

export const Footer = (): ReactElement => (
    <footer className="container mx-auto">
        <div className="text-center text-slate-500 font-bold space-x-2">
            <FontAwesomeIcon
                icon={faCopyright}
            />
            <span>
                2022 Lexique Québécois
            </span>
        </div>
    </footer>
);
