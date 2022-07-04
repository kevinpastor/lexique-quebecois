import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ErrorMessage, Field as FormikField } from "formik";
import { MutableRefObject, ReactElement, useId } from "react";

import { useAutoResize } from "@utils/hooks/use-auto-resize";

interface Props<T> {
    name: keyof T;
    label?: string;
    autofocus?: boolean;
    type?: "input" | "select" | "textarea";
    icon?: IconDefinition;
    placeholder?: string;
    hideErrors?: boolean;
    onBlur?: () => void;
}

export const Field = <T extends Record<string, unknown>>({
    label,
    name,
    autofocus,
    type = "input",
    icon,
    placeholder,
    hideErrors = false,
    onBlur: handleBlur
}: Props<T>): ReactElement => {
    const id: string = useId();

    const ref: MutableRefObject<HTMLTextAreaElement | undefined> = useAutoResize();

    return (
        <div className="space-y-1">
            {label &&
                <label
                    htmlFor={id}
                    className="cursor-pointer"
                >
                    {label}
                </label>
            }
            <div
                className="flex items-center relative"
            >
                {icon &&
                    <div className="text-slate-400 fill-transparent stroke-current absolute pl-4 pointer-events-none">
                        <FontAwesomeIcon icon={icon} />
                    </div>
                }
                <FormikField
                    name={name}
                    as={type}
                    autoFocus={autofocus}
                    className={classNames(
                        "rounded bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 transition w-full placeholder-slate-400 outline-none caret-white text-slate-300 resize-none py-2 px-4",
                        {
                            "pl-10": !!icon,
                            "resize-y": type === "textarea"
                        }
                    )}
                    // style={{ height }}
                    placeholder={placeholder}
                    id={id}
                    innerRef={type === "textarea" ? ref : undefined}
                    onBlur={handleBlur}
                />
            </div>
            {!hideErrors &&
                <ErrorMessage name={name as string}>
                    {(message: string): ReactElement => (
                        <div className="text-red-500 text-sm">
                            {message}
                        </div>
                    )}
                </ErrorMessage>
            }
        </div>
    );
};
