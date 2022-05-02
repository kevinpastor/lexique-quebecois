import { useEffect, useLayoutEffect } from "react";

// See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
export const useIsomorphicLayoutEffect = (
    typeof window !== "undefined"
        ? useLayoutEffect
        : useEffect
);
