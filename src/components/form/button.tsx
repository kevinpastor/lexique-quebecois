import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ReactElement } from "react";

import { Type } from "@components/type";
import { Variant } from "@components/variant";

interface Props {
    label: string;
    icon?: IconDefinition;
    onClick?: () => void;
    disabled?: boolean;
    ariaLabel: string;
    type?: Type;
    variant?: Variant;
    isLoading?: boolean;
}

export const Button = ({
    label,
    icon,
    onClick,
    disabled = false,
    ariaLabel,
    type = Type.Filled,
    variant,
    isLoading = false
}: Props): ReactElement => (
    <button
        type={onClick ? "button" : "submit"}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classNames(
            "transition font-bold rounded-lg py-2 text-center flex place-items-center gap-2 disabled:saturate-75 disabled:brightness-70 disabled:cursor-not-allowed",
            {
                "px-4": type === Type.Filled,
                "bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400 hover:disabled:bg-blue-500": type === Type.Filled && variant === undefined,
                "bg-red-600 hover:bg-red-500 focus-visible:bg-red-500 hover:disabled:bg-red-600": type === Type.Filled && variant === Variant.Error,
                "px-2 hover:bg-white/20": type === Type.Text,
                "px-3 py-1": type === Type.Outlined,
                "hover:bg-white/20 border-2 border-slate-600": type === Type.Outlined && variant === undefined,
                "hover:bg-red-600/20 border-2 border-red-600 text-red-600": type === Type.Outlined && variant === Variant.Error
            }
        )}
        disabled={disabled || isLoading}
    >
        {isLoading &&
            <FontAwesomeIcon
                icon={faCircleNotch}
                size="lg"
                spin
            />
        }
        {!isLoading && icon &&
            <FontAwesomeIcon
                icon={icon}
                size="lg"
            />
        }
        {label}
    </button>
);
