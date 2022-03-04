import { ReactElement } from "react";

interface Props {
    onClick: () => void;
    icon: ReactElement;
}

export const IconButton = ({ onClick, icon }: Props): ReactElement => (
    <button
        type="button"
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-600 font-bold rounded-full p-2 text-white text-center flex flex-row space-x-2 transition"
    >
        {icon}
    </button>
);
