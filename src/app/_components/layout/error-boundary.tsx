"use client";

import { Component, type PropsWithChildren, type ReactElement, type ReactNode } from "react";

interface Props {
    fallback: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren<Props>, State> {

    public static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    public constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    public shouldComponentUpdate(): boolean {
        return true;
    }

    public render(): ReactElement {
        const { children, fallback } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return (
                <>
                    {fallback}
                </>
            );
        }

        return (
            <>
                {children}
            </>
        );
    }

}
