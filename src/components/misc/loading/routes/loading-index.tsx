import { ReactElement } from "react";

import { Card } from "@components/misc/card";

export const LoadingIndex = (): ReactElement => (
    <div className="space-y-4">
        <Card>
            <div className="space-y-4">
                <div className="animate-pulse flex justify-between">
                    <div className="bg-black/[.12] p-5 rounded w-48" />
                </div>
                <div className="animate-pulse animation-delay-[100ms] bg-black/[.12] p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[200ms] bg-black/[.12] p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[300ms] bg-black/[.12] p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[400ms] flex justify-between">
                    <div className="flex gap-2px">
                        <div className="bg-black/[.12] h-[45.5px] w-[68px] rounded-l" />
                        <div className="bg-black/[.12] h-[45.5px] w-[68px] rounded-r" />
                    </div>
                    <div className="bg-black/[.12] h-[45.5px] w-[130px] rounded" />
                </div>
            </div>
        </Card>
        <Card>
            <div className="space-y-4">
                <div className="animate-pulse animation-delay-[500ms] flex justify-between">
                    <div className="bg-black/[.12] p-5 rounded w-48" />
                </div>
                <div className="animate-pulse animation-delay-[600ms] bg-black/[.12] p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[700ms] bg-black/[.12] p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[800ms] bg-black/[.12] p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[900ms] flex justify-between">
                    <div className="flex gap-2px">
                        <div className="bg-black/[.12] h-[45.5px] w-[68px] rounded-l" />
                        <div className="bg-black/[.12] h-[45.5px] w-[68px] rounded-r" />
                    </div>
                    <div className="bg-black/[.12] h-[45.5px] w-[130px] rounded" />
                </div>
            </div>
        </Card>
        <Card>
            <div className="space-y-4">
                <div className="animate-pulse animation-delay-[1000ms] flex justify-between">
                    <div className="bg-black/[.12] p-5 rounded w-48" />
                </div>
                <div className="animate-pulse animation-delay-[1100ms] bg-black/[.12] p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[1200ms] bg-black/[.12] p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[1300ms] bg-black/[.12] p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[1400ms] flex justify-between">
                    <div className="flex gap-2px">
                        <div className="bg-black/[.12] h-[45.5px] w-[68px] rounded-l" />
                        <div className="bg-black/[.12] h-[45.5px] w-[68px] rounded-r" />
                    </div>
                    <div className="bg-black/[.12] h-[45.5px] w-[130px] rounded" />
                </div>
            </div>
        </Card>
        <Card>
            <div className="space-y-4">
                <div className="animate-pulse animation-delay-[1500ms] flex justify-between">
                    <div className="bg-black/[.12] p-5 rounded w-48" />
                </div>
                <div className="animate-pulse animation-delay-[1600ms] bg-black/[.12] p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[1700ms] bg-black/[.12] p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[1800ms] bg-black/[.12] p-[14px] rounded" />
                <div className="animate-pulse animation-delay-[1900ms] flex justify-between">
                    <div className="flex gap-2px">
                        <div className="bg-black/[.12] h-[45.5px] w-[68px] rounded-l" />
                        <div className="bg-black/[.12] h-[45.5px] w-[68px] rounded-r" />
                    </div>
                    <div className="bg-black/[.12] h-[45.5px] w-[130px] rounded" />
                </div>
            </div>
        </Card>
    </div>
);
