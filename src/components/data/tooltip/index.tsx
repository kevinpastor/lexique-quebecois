import classNames from "classnames";
import { PropsWithChildren, ReactElement } from "react";

import { Placement } from "@components/placement";

import { ITooltipContext, TooltipContext } from "./context";

interface Props {
    label: string;
    placement?: Placement;
}

const value: ITooltipContext = {
    hasTooltip: true
};

export const Tooltip = ({
    label,
    placement = Placement.Top,
    children
}: PropsWithChildren<Props>): ReactElement => (
    <TooltipContext.Provider value={value}>
        <div className="relative">
            {children}
            <div className={classNames(
                "inline-block absolute invisible opacity-0 peer-hover:visible peer-hover:opacity-100 whitespace-nowrap overflow-visible z-10 text-sm px-4 py-2 bg-white/[.09] rounded-lg shadow-md transition",
                {
                    "mb-2 bottom-full left-0": placement === "top-start",
                    "mb-2 bottom-full left-1/2 -translate-x-1/2": placement === "top",
                    "mb-2 bottom-full left-full -translate-x-full": placement === "top-end",
                    "top-full left-0": placement === "bottom-start",
                    "top-full left-1/2 -translate-x-1/2": placement === "bottom",
                    "top-full left-full -translate-x-full": placement === "bottom-end",
                    "mr-2 right-full": placement === "left",
                    "ml-2 left-full": placement === "right"
                }
            )}
            >
                {label}
            </div>
        </div>
    </TooltipContext.Provider>
);
