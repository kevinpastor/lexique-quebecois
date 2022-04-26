import { PropsWithChildren, ReactElement } from "react";

import { ITooltipContext, TooltipContext } from "./context";

interface Props {
    label: string;
}

const value: ITooltipContext = {
    hasTooltip: true
};

export const Tooltip = ({ label, children }: PropsWithChildren<Props>): ReactElement => (
    <TooltipContext.Provider value={value}>
        <div className="relative">
            {children}
            <div className="inline-block absolute invisible opacity-0 peer-hover:visible peer-hover:opacity-100 whitespace-nowrap overflow-visible mb-2 bottom-full left-1/2 -translate-x-1/2 z-10 text-sm px-4 py-2 bg-slate-700 rounded-lg shadow-md transition after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-solid after:border-transparent after:border-t-slate-700">
                {label}
            </div>
        </div>
    </TooltipContext.Provider>
);
