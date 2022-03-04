import { ReactElement, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface Props {
    name: string;
    required?: boolean;
    autofocus?: boolean;
}

export const Field = ({ name, required = false, autofocus = false }: Props): ReactElement => {
    const [id, setId] = useState("");

    useEffect((): void => {
        setId(uuid());
    }, []);

    return (
        <>
            <label
                htmlFor={id}
                className="text-slate-200"
            >
                {name}
            </label>
            <input
                id={id}
                className="rounded bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 transition px-4 py-2 outline-none text-slate-300 w-full"
                name={name}
                autoFocus={autofocus}
                minLength={2}
                maxLength={32}
                pattern={labelRegex.source}
            />
        </>
    );
};
