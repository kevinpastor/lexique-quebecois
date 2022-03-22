import { ButtonHTMLAttributes, ReactElement } from "react";
import classnames from "classnames";
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
        className={classnames(
            "bg-gradient-to-br transition font-bold rounded-lg px-6 py-3 text-center flex flex-row place-items-center gap-2",
            {
                "bg-blue-500 from-blue-400 to-blue-500 hover:bg-blue-600 hover:brightness-90 text-white": !disabled,
                "bg-blue-900 saturate-50 text-slate-400": disabled
            }
        )}
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
