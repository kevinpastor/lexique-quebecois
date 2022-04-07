import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";

interface Props {
    onClick: () => void;
    icon: IconDefinition;
    ariaLabel: string;
    disabled?: boolean;
}

export const IconButton = ({
    onClick,
    icon,
    disabled = false,
    ariaLabel
}: Props): ReactElement => (
    <button
        type="button"
        onClick={onClick}
        className="transition bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400 hover:disabled:bg-blue-500 text-white disabled:saturate-75 disabled:brightness-70 disabled:cursor-not-allowed rounded-full p-2 w-10 h-10"
        disabled={disabled}
        aria-label={ariaLabel}
    >
        <FontAwesomeIcon
            icon={icon}
            size="lg"
        />
    </button>
);
