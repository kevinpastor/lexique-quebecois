import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ReactElement, useContext } from "react";

import { IButtonGroupContext, ButtonGroupContext } from "@components/form/button-group/context";
import { Variant } from "@components/variant";

interface Props {
    label: string;
    icon?: IconDefinition;
    onClick?: () => void;
    disabled?: boolean;
    ariaLabel: string;
    isActive: boolean;
    variant?: Variant;
}

export const ToggleButton = ({
    label,
    icon,
    onClick,
    disabled = false,
    ariaLabel,
    isActive,
    variant
}: Props): ReactElement => {
    const { isInGroup }: IButtonGroupContext = useContext(ButtonGroupContext);

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
            className={classNames(
                "transition font-bold py-2 text-center flex place-items-center gap-2 disabled:saturate-75 disabled:brightness-70 disabled:cursor-not-allowed rounded-full px-4",
                {
                    "border-2 border-white/[.12] hover:bg-white/[.04] active:bg-white/[.10] focus-visible:bg-white/[.12]": !isActive,
                    "text-white bg-white/[.12] hover:bg-white/[.15]": isActive && variant === undefined,
                    "text-white bg-sky-500 hover:bg-sky-400": isActive && variant === Variant.Info,
                    "text-white bg-green-600 hover:bg-green-500": isActive && variant === Variant.Success,
                    "text-white bg-amber-600 hover:bg-amber-500": isActive && variant === Variant.Warning,
                    "text-white bg-red-600 hover:bg-red-500": isActive && variant === Variant.Error,
                    // TODO Fix `rounded-none` and `rounded-full` collision
                    "rounded-none first:rounded-l-full last:rounded-r-full last:border-l-0": isInGroup
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
};
