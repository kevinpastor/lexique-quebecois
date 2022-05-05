import { ErrorMessage, Field as FormikField } from "formik";
import { ReactElement, useId } from "react";

interface Props<T> {
    name: keyof T;
    label?: string;
    hideErrors?: boolean;
}

export const Switch = <T extends Record<string, unknown>>({
    label,
    name,
    hideErrors = false
}: Props<T>): ReactElement => {
    const id: string = useId();

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
                <label
                    htmlFor={id}
                    className="cursor-pointer"
                >
                    <FormikField
                        name={name}
                        type="checkbox"
                        className="sr-only peer"
                        id={id}
                    />
                    <div className="w-11 h-6 peer-focus:outline-none rounded-full transition bg-slate-700 hover:bg-slate-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 peer-checked:hover:bg-blue-400" />
                </label>
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
