import { ReactElement } from "react";

import { Card } from "@components/misc/card";

export const LoadingIndex = (): ReactElement => (
    <div className="space-y-4">
        <Card>
            <div className="space-y-4">
                <div className="animate-pulse flex justify-between">
                    <div className="bg-slate-700 p-5 rounded w-48" />
                    <div className="bg-slate-700 p-5 rounded-full" />
                </div>
                <div className="animate-pulse animation-delay-[100ms] bg-slate-700 p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[200ms] bg-slate-700 p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[300ms] bg-slate-700 p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[400ms] flex gap-[2px]">
                    <div className="bg-slate-700 px-8 py-5 rounded-l-full" />
                    <div className="bg-slate-700 px-8 py-5 rounded-r-full" />
                </div>
            </div>
        </Card>
        <Card>
            <div className="space-y-4">
                <div className="animate-pulse animation-delay-[500ms] flex justify-between">
                    <div className="bg-slate-700 p-5 rounded w-48" />
                    <div className="bg-slate-700 p-5 rounded-full" />
                </div>
                <div className="animate-pulse animation-delay-[600ms] bg-slate-700 p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[700ms] bg-slate-700 p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[800ms] bg-slate-700 p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[900ms] flex gap-[2px]">
                    <div className="bg-slate-700 px-8 py-5 rounded-l-full" />
                    <div className="bg-slate-700 px-8 py-5 rounded-r-full" />
                </div>
            </div>
        </Card>
        <Card>
            <div className="space-y-4">
                <div className="animate-pulse animation-delay-[1000ms] flex justify-between">
                    <div className="bg-slate-700 p-5 rounded w-48" />
                    <div className="bg-slate-700 p-5 rounded-full" />
                </div>
                <div className="animate-pulse animation-delay-[1100ms] bg-slate-700 p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[1200ms] bg-slate-700 p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[1300ms] bg-slate-700 p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[1400ms] flex gap-[2px]">
                    <div className="bg-slate-700 px-8 py-5 rounded-l-full" />
                    <div className="bg-slate-700 px-8 py-5 rounded-r-full" />
                </div>
            </div>
        </Card>
        <Card>
            <div className="space-y-4">
                <div className="animate-pulse animation-delay-[1500ms] flex justify-between">
                    <div className="bg-slate-700 p-5 rounded w-48" />
                    <div className="bg-slate-700 p-5 rounded-full" />
                </div>
                <div className="animate-pulse animation-delay-[1600ms] bg-slate-700 p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[1700ms] bg-slate-700 p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[1800ms] bg-slate-700 p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[1900ms] flex gap-[2px]">
                    <div className="bg-slate-700 px-8 py-5 rounded-l-full" />
                    <div className="bg-slate-700 px-8 py-5 rounded-r-full" />
                </div>
            </div>
        </Card>
    </div>
);
