import { ReactElement } from "react";

import { Card } from "@components/misc/card";

export const LoadingWord = (): ReactElement => (
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
);
