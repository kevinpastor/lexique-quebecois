import { ReactElement } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    onClick: () => void;
    icon: IconDefinition;
}

export const IconButton = ({ onClick, icon }: Props): ReactElement => (
    <button
        type="button"
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-600 rounded-full p-2 text-white transition w-10 h-10"
    >
        <FontAwesomeIcon
            icon={icon}
            size="lg"
        />
    </button>
);
