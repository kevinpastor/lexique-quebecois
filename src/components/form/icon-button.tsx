import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ReactElement } from "react";

import { Type } from "@components/type";

interface Props {
    onClick: () => void;
    icon: IconDefinition;
    ariaLabel: string;
    disabled?: boolean;
    type?: Type;
}

export const IconButton = ({
    onClick,
    icon,
    ariaLabel,
    disabled = false,
    type = Type.Filled
}: Props): ReactElement => (
    <button
        type="button"
        onClick={onClick}
        className={classNames(
            "transition disabled:saturate-75 disabled:brightness-70 disabled:cursor-not-allowed rounded-full p-2 w-10 h-10",
            {
                "text-white bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400 hover:disabled:bg-blue-500": type === Type.Filled,
                "text-slate-100 hover:text-white hover:bg-blue-400 focus-visible:bg-blue-400 hover:disabled:bg-blue-500": type === Type.Text
            }
        )}
        disabled={disabled}
        aria-label={ariaLabel}
    >
        <FontAwesomeIcon
            icon={icon}
            size="lg"
        />
    </button>
);
