import { ReactElement } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    onClick: () => void;
    icon: IconDefinition;
    ariaLabel: string;
}

export const IconButton = ({ onClick, icon, ariaLabel }: Props): ReactElement => (
    <button
        type="button"
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-600 bg-gradient-to-br from-blue-400 to-blue-500 hover:brightness-90 rounded-full p-2 text-white transition w-10 h-10"
        aria-label={ariaLabel}
    >
        <FontAwesomeIcon
            icon={icon}
            size="lg"
        />
    </button>
);
