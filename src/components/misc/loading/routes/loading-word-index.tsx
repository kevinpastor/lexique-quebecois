import { ReactElement } from "react";

import { Card } from "@components/misc/card";

export const LoadingWordIndex = (): ReactElement => (
    <Card>
        <div className="space-y-4">
            <div className="animate-pulse bg-slate-700 p-5 rounded w-1/4" />
            <div className="animate-pulse animation-delay-[100ms] bg-slate-700 p-4 rounded w-1/12" />
            <div className="space-y-2">
                <div className="animate-pulse animation-delay-[200ms] bg-slate-700 p-[10px] rounded w-1/3" />
                <div className="animate-pulse animation-delay-[300ms] bg-slate-700 p-[10px] rounded w-1/5" />
                <div className="animate-pulse animation-delay-[400ms] bg-slate-700 p-[10px] rounded w-1/3" />
                <div className="animate-pulse animation-delay-[500ms] bg-slate-700 p-[10px] rounded w-1/4" />
                <div className="animate-pulse animation-delay-[600ms] bg-slate-700 p-[10px] rounded w-1/2" />
            </div>
            <div className="animate-pulse animation-delay-[700ms] bg-slate-700 p-4 rounded w-1/12" />
            <div className="space-y-2">
                <div className="animate-pulse animation-delay-[800ms] bg-slate-700 p-[10px] rounded w-1/3" />
                <div className="animate-pulse animation-delay-[900ms] bg-slate-700 p-[10px] rounded w-1/5" />
                <div className="animate-pulse animation-delay-[1000ms] bg-slate-700 p-[10px] rounded w-1/2" />
            </div>
            <div className="animate-pulse animation-delay-[1100ms] bg-slate-700 p-4 rounded w-1/12" />
            <div className="space-y-2">
                <div className="animate-pulse animation-delay-[1200ms] bg-slate-700 p-[10px] rounded w-1/4" />
                <div className="animate-pulse animation-delay-[1300ms] bg-slate-700 p-[10px] rounded w-1/5" />
                <div className="animate-pulse animation-delay-[1400ms] bg-slate-700 p-[10px] rounded w-1/2" />
                <div className="animate-pulse animation-delay-[1500ms] bg-slate-700 p-[10px] rounded w-1/3" />
            </div>
            <div className="animate-pulse animation-delay-[1600ms] bg-slate-700 p-4 rounded w-1/12" />
            <div className="space-y-2">
                <div className="animate-pulse animation-delay-[1700ms] bg-slate-700 p-[10px] rounded w-1/4" />
            </div>
            <div className="animate-pulse animation-delay-[1800ms] bg-slate-700 p-4 rounded w-1/12" />
            <div className="space-y-2">
                <div className="animate-pulse animation-delay-[1900ms] bg-slate-700 p-[10px] rounded w-1/5" />
                <div className="animate-pulse animation-delay-[2000ms] bg-slate-700 p-[10px] rounded w-1/2" />
                <div className="animate-pulse animation-delay-[2100ms] bg-slate-700 p-[10px] rounded w-1/3" />
                <div className="animate-pulse animation-delay-[2200ms] bg-slate-700 p-[10px] rounded w-1/4" />
                <div className="animate-pulse animation-delay-[2200ms] bg-slate-700 p-[10px] rounded w-1/3" />
            </div>
        </div>
    </Card>
);
