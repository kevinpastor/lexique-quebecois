import { type FeatureBundle, LazyMotion } from "framer-motion";
import { type PropsWithChildren, type ReactNode } from "react";

const lazyFeatures = async (): Promise<FeatureBundle> => {
    const { features } = await import("./features");

    return features;
};

export const AnimationProvider = ({ children }: PropsWithChildren): ReactNode => (
    <LazyMotion
        features={lazyFeatures}
        strict
    >
        {children}
    </LazyMotion>
);
