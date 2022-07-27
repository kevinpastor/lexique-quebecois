import classNames from "classnames";
import { ReactElement, ReactNode, useContext } from "react";

import { IButtonGroupContext, ButtonGroupContext } from "@components/form/button-group/context";
import { Variant } from "@components/variant";

interface Props {
    label: string;
    icon?: ReactNode;
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
                "transition font-bold py-2 text-center flex place-items-center gap-2 disabled:saturate-75 disabled:brightness-70 disabled:cursor-not-allowed rounded px-4",
                {
                    "border-2 border-black/[.12] hover:bg-black/[.04] active:bg-black/[.10] focus-visible:bg-black/[.12]": !isActive,
                    "text-black bg-white/[.12] hover:bg-white/[.15]": isActive && variant === undefined,
                    "text-black bg-sky-500 hover:bg-sky-400": isActive && variant === Variant.Info,
                    "text-black bg-green-600 hover:bg-green-500": isActive && variant === Variant.Success,
                    "text-black bg-amber-600 hover:bg-amber-500": isActive && variant === Variant.Warning,
                    "text-black bg-red-600 hover:bg-red-500": isActive && variant === Variant.Error,
                    // TODO Fix `rounded-none` and `rounded-full` collision
                    "rounded-none first:rounded-l last:rounded-r last:border-l-0": isInGroup
                }
            )}
            disabled={disabled}
        >
            {icon}
            {label}
        </button>
    );
};
