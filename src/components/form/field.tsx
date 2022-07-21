import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ErrorMessage, Field as FormikField, useFormikContext } from "formik";
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
    required?: boolean;
    optional?: boolean;
}

export const Field = <T extends Record<string, unknown>>({
    label,
    name,
    autofocus,
    type = "input",
    icon,
    placeholder,
    hideErrors = false,
    onBlur: handleBlur,
    required = false,
    optional = false
}: Props<T>): ReactElement => {
    const id: string = useId();
    const ref: MutableRefObject<HTMLTextAreaElement | undefined> = useAutoResize();
    const { errors } = useFormikContext<T>();

    return (
        <div className="space-y-1">
            {label &&
                <label
                    htmlFor={id}
                    className="cursor-pointer text-black/[.87]"
                >
                    <span className="font-medium">
                        {label}
                    </span>
                    {optional &&
                        <span> (optionnel)</span>
                    }
                    {required &&
                        <span> *</span>
                    }
                </label>
            }
            <div
                className="flex items-center relative bg-white/[.07] rounded"
            >
                {icon &&
                    <div className="text-black/[.38] fill-transparent stroke-current absolute pl-4 pointer-events-none">
                        <FontAwesomeIcon icon={icon} />
                    </div>
                }
                <FormikField
                    name={name}
                    as={type}
                    autoFocus={autofocus}
                    className={classNames(
                        "rounded bg-transparent hover:bg-white/[.04] focus:bg-white/[.12] transition w-full placeholder-white/[.38] outline-none caret-white text-black/[.87] resize-none py-2 px-4",
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
            {(required && !errors[name]) &&
                <div className="text-black/[.60] text-sm">
                    *obligatoire
                </div>
            }
        </div>
    );
};
