import classNames from "classnames";
import { ReactElement } from "react";

import { Button } from "@components/form/button";
import { Type } from "@components/type";
import { Variant } from "@components/variant";

export interface Props {
    label: string;
    variant?: Variant;
    actionLabel?: string;
    onAction?: () => void;
}

export const Snackbar = ({
    label,
    variant,
    actionLabel,
    onAction
}: Props): ReactElement => (
    <div
        role="alert"
        className="fixed bottom-4 left-4 right-4 flex justify-center pointer-events-none"
    >
        <div
            className={classNames(
                "max-w-md p-4 rounded-lg shadow-md flex justify-between items-center gap-4 pointer-events-auto",
                {
                    "bg-slate-600": variant === undefined,
                    "bg-sky-500": variant === Variant.Info,
                    "bg-green-600": variant === Variant.Success,
                    "bg-amber-600": variant === Variant.Warning,
                    "bg-red-600": variant === Variant.Error
                }
            )}
        >
            <div>
                {label}
            </div>
            {actionLabel && onAction && variant === Variant.Error &&
                <div className="-m-2">
                    <Button
                        onClick={onAction}
                        label={actionLabel}
                        ariaLabel="Réessayer"
                        type={Type.Text}
                    />
                </div>}
        </div>
    </div>
);
