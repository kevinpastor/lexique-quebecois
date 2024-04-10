import { useEffect, useLayoutEffect } from "react";

const IS_SERVER = typeof window === "undefined";

// See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
export const useIsomorphicLayoutEffect = (
    IS_SERVER
        ? useEffect
        : useLayoutEffect
);
