import { ButtonHTMLAttributes, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Props {
    label: string;
    icon?: IconDefinition;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onClick?: () => void;
    disabled?: boolean;
    ariaLabel: string;
}

export const Button = ({ label, type = "submit", icon, onClick, disabled = false, ariaLabel }: Props): ReactElement => (
    <button
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        className="transition font-bold rounded-lg px-6 py-3 text-center flex flex-row place-items-center gap-2 bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400 hover:disabled:bg-blue-500 text-white disabled:saturate-75 disabled:brightness-70 disabled:cursor-not-allowed"
        disabled={disabled}
    >
        {icon &&
            <FontAwesomeIcon
                icon={icon}
                size="lg"
            />
        }
        {label}
    </button>
);
