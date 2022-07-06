import { ReactElement } from "react";

export const ProgressIndicator = (): ReactElement => (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/[.05] overflow-hidden">
        <div className="absolute bg-blue-500 h-1 animate-progress-increase" />
        <div className="absolute bg-blue-500 h-1 animate-progress-decrease" />
    </div>
);
