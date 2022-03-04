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
        className="bg-blue-500 hover:bg-blue-600 rounded-full p-2 text-white flex flex-row justify-center items-center transition"
    >
        <FontAwesomeIcon icon={icon} className="w-6 h-6" />
    </button>
);
