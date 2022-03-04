import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field as FormikField, useFormikContext } from "formik";
import { ReactElement, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

interface Props<T> {
    name: keyof T;
    label?: string;
    autofocus?: boolean;
    type?: "input" | "select" | "textarea";
    icon?: IconDefinition;
    placeholder?: string;
    hideErrors?: boolean;
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
export const Field = <T,>({ label, name, autofocus, type = "input", icon, placeholder, hideErrors = false }: Props<T>): ReactElement => {
    const { touched, errors } = useFormikContext<T>();
    const inputRef = useRef<HTMLInputElement>(null);
    const [id, setId] = useState("");

    useEffect((): void => {
        setId(uuid());
    }, []);

    const onClick = (): void => {
        inputRef.current?.focus();
    };

    return (
        <div className="space-y-1">
            {label &&
                <label
                    htmlFor={id}
                    className="text-slate-200"
                >
                    {label}
                </label>
            }
            <div
                onClick={onClick}
                className="rounded bg-slate-700 hover:bg-slate-600 active:bg-slate-600 transition flex flex-row items-center cursor-text py-2 px-4 gap-2"
            >
                {
                    icon &&
                    <FontAwesomeIcon
                        icon={icon}
                        className="h-4 w-4 text-slate-400 fill-transparent stroke-current"
                    />
                }
                <FormikField
                    name={name}
                    as={type}
                    autoFocus={autofocus/* TODO Fix me */}
                    className="w-full placeholder-slate-500 focus:placeholder-slate-400 bg-transparent outline-none caret-white text-slate-300 resize-none"
                    innerRef={inputRef}
                    placeholder={placeholder}
                    id={id}
                />
            </div>
            {!hideErrors && touched[name] &&
                <div className="text-slate-600 text-sm">
                    {errors[name]}
                </div>
            }
        </div>
    );
};
