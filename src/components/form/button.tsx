import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ReactElement } from "react";

import { Type } from "@components/type";

interface Props {
    label: string;
    icon?: IconDefinition;
    onClick?: () => void;
    disabled?: boolean;
    ariaLabel: string;
    type?: Type;
}

export const Button = ({
    label,
    icon,
    onClick,
    disabled = false,
    ariaLabel,
    type = Type.Filled
}: Props): ReactElement => (
    <button
        type={onClick ? "button" : "submit"}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classNames(
            "transition font-bold rounded-lg py-2 text-center flex place-items-center gap-2  disabled:saturate-75 disabled:brightness-70 disabled:cursor-not-allowed",
            {
                "px-4 bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400 hover:disabled:bg-blue-500": type === Type.Filled,
                "px-2 hover:bg-white/20": type === Type.Text
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
