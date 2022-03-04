import { Field as FormikField, useFormikContext } from "formik";
import { ReactElement } from "react";

interface Props<T> {
    label: string;
    name: keyof T;
    autofocus?: boolean;
    type?: "input" | "select" | "textarea";
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
export const Field = <T,>({ label, name, autofocus, type = "input" }: Props<T>): ReactElement => {
    const { touched, errors } = useFormikContext<T>();
    return (
        <div className="space-y-1">
            <label className="text-slate-200">
                {label}
            </label>
            <FormikField
                name={name}
                as={type}
                autoFocus={autofocus/* FIXME */}
                className="rounded bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 transition px-4 py-2 outline-none text-slate-300 w-full resize-none"
            />
            {touched[name] &&
                <div className="text-slate-600 text-sm">
                    {errors[name]}
                </div>
            }
        </div>
    );
};
