import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field as FormikField } from "formik";
import { ReactElement, useRef } from "react";

import { useId } from "@utils/hooks/use-id";

interface Props<T> {
    name: keyof T;
    label?: string;
    autofocus?: boolean;
    type?: "input" | "select" | "textarea";
    icon?: IconDefinition;
    placeholder?: string;
    hideErrors?: boolean;
}

export const Field = <T extends Record<string, unknown>>({ label, name, autofocus, type = "input", icon, placeholder, hideErrors = false }: Props<T>): ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null);
    const id: string = useId();

    const onClick = (): void => {
        inputRef.current?.focus();
    };

    return (
        <div className="space-y-1">
            {label &&
                <label htmlFor={id}>
                    {label}
                </label>
            }
            <div
                onClick={onClick}
                className="rounded bg-slate-700 hover:bg-slate-600 active:bg-slate-600 transition flex items-center cursor-text py-2 px-4 gap-2"
            >
                {icon &&
                    <div className="text-slate-400 fill-transparent stroke-current">
                        <FontAwesomeIcon icon={icon} />
                    </div>
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
            {!hideErrors &&
                <ErrorMessage name={name as string}>
                    {(message: string): ReactElement => (
                        <div className="text-slate-600 text-sm">
                            {message}
                        </div>
                    )}
                </ErrorMessage>
            }
        </div>
    );
};
