import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ReactElement, useContext } from "react";

import { ITooltipContext, TooltipContext } from "@components/data/tooltip/context";
import { Type } from "@components/type";

interface Props {
    onClick: () => void;
    icon: IconDefinition;
    ariaLabel: string;
    disabled?: boolean;
    type?: Type;
    isLoading?: boolean;
}

export const IconButton = ({
    onClick,
    icon,
    ariaLabel,
    disabled = false,
    type = Type.Filled,
    isLoading = false
}: Props): ReactElement => {
    const { hasTooltip }: ITooltipContext = useContext(TooltipContext);
    return (
        <button
            type="button"
            onClick={onClick}
            className={classNames(
                "transition disabled:saturate-75 disabled:brightness-70 disabled:cursor-not-allowed rounded-full p-2 w-10 h-10",
                {
                    "text-white bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400 hover:disabled:bg-blue-500": type === Type.Filled,
                    "text-slate-400 hover:text-white hover:bg-slate-600 focus-visible:bg-slate-600 hover:disabled:bg-transparent": type === Type.Text,
                    "peer": hasTooltip
                }
            )}
            disabled={disabled || isLoading}
            aria-label={ariaLabel}
        >
            {isLoading
                ? (
                    <FontAwesomeIcon
                        icon={faCircleNotch}
                        size="lg"
                        spin
                    />
                )
                : (
                    <FontAwesomeIcon
                        icon={icon}
                        size="lg"
                    />
                )}
        </button>
    );
};
