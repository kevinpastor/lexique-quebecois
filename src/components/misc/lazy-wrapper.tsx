import dynamic from "next/dynamic";
import { ComponentType, PropsWithChildren, ReactElement, useCallback, useMemo } from "react";

interface Props<WrapperProps> {
    Wrapper: () => Promise<ComponentType<WrapperProps>>;
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
export const LazyWrapper = <WrapperProps,>({
    Wrapper,
    children,
    ...wrapperProps
}: PropsWithChildren<Props<WrapperProps>> & WrapperProps): ReactElement => {
    const fallback = useCallback((): ReactElement => (
        <>
            {children}
        </>
    ), [children]);

    const DynamicWrapper = useMemo((): ComponentType<WrapperProps> => (
        dynamic(
            Wrapper,
            {
                ssr: false,
                loading: fallback
            }
        )
    ), [Wrapper, fallback]);

    return (
        <DynamicWrapper {...wrapperProps}>
            {children}
        </DynamicWrapper>
    );
};
