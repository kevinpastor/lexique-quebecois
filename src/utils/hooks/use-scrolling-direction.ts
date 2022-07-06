import { useEffect, useState } from "react";

interface ReturnType {
    isScrollingUp: boolean;
    isScrollingDown: boolean;
}

export const useScrollingDirection = (): ReturnType => {
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);

    useEffect((): (() => void) => {
        const handleScroll = (): void => {
            setIsScrollingDown(window.scrollY > lastScrollPosition);
            setLastScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return (): void => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollPosition]);

    return {
        isScrollingUp: !isScrollingDown,
        isScrollingDown: isScrollingDown
    };
};
