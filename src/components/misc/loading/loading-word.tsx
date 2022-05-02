import { ReactElement } from "react";

import { Card } from "@components/misc/card";

export const LoadingWord = (): ReactElement => (
    <Card>
        <div className="flex justify-between mb-4">
            <div className="bg-slate-700 animate-pulse p-5 rounded w-48" />
            <div className="bg-slate-700 animate-pulse p-5 rounded-full" />
        </div>
        <div className="space-y-4">
            <div className="bg-slate-700 animate-pulse p-[14px] rounded" />
            <div className="bg-slate-700 animate-pulse p-[14px] rounded" />
            <div className="bg-slate-700 animate-pulse p-[14px] rounded" />
            <div className="flex gap-[2px]">
                <div className="bg-slate-700 animate-pulse px-8 py-5 rounded-l-full" />
                <div className="bg-slate-700 animate-pulse px-8 py-5 rounded-r-full" />
            </div>
        </div>
    </Card>
);
