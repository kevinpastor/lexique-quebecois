import { ButtonHTMLAttributes, ReactElement } from "react";

interface Props {
    label: string;
    icon?: ReactElement;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onClick?: () => void;
}

export const Button = ({ label, type = "submit", icon, onClick }: Props): ReactElement => (
    <button
        type={type}
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-600 transition font-bold rounded-lg px-6 py-3 text-white text-center flex flex-row gap-2"
    >
        {icon}
        {label}
    </button>
);
