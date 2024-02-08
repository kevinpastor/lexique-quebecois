import { AnimatePresence, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { type PropsWithChildren, type ReactNode } from "react";

const distance: number = 25;

export const TransitionProvider = ({ children }: PropsWithChildren): ReactNode => {
    const pathname: string = usePathname();

    return (
        // TODO Disable on change other than homepage to or from search.
        <AnimatePresence
            initial={false}
            mode="wait"
        >
            <m.div
                key={pathname}
                transition={{
                    type: "tween",
                    ease: "easeOut"
                }}
                initial={{
                    opacity: 0,
                    x: pathname === "/rechercher" ? distance : -distance
                }}
                animate={{
                    opacity: 1,
                    x: 0
                }}
                exit={{
                    opacity: 0,
                    x: pathname === "/rechercher" ? distance : -distance
                }}
            >
                {children}
            </m.div>
        </AnimatePresence>
    );
};
