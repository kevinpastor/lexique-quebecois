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
}

export const Button = ({ label, type = "submit", icon, onClick, disabled = false }: Props): ReactElement => (
    <button
        type={type}
        onClick={onClick}
        className={classnames(
            "transition font-bold rounded-lg px-6 py-3 text-center flex flex-row gap-2",
            {
                "bg-blue-500 hover:bg-blue-600 text-white": !disabled,
                "bg-blue-900 saturate-50 text-slate-400": disabled
            }
        )}
        disabled={disabled}
    >
        {icon &&
            <FontAwesomeIcon icon={icon} className="w-6 h-6" />
        }
        {label}
    </button>
);
