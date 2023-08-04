import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { PropsWithChildren, ReactElement } from "react";

const distance: number = 25;

export const TransitionProvider = ({ children }: PropsWithChildren): ReactElement => {
    const pathname: string = usePathname();

    return (
        // TODO Disable on change other than homepage to or from search.
        <AnimatePresence
            initial={false}
            mode="wait"
        >
            <motion.div
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
            </motion.div>
        </AnimatePresence>
    );
};
