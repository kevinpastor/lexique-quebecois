import { AnimatePresence, m } from "framer-motion";
import { type ReactNode } from "react";

interface Props {
    value?: number;
}

export const CrossfadeLoad = ({ value }: Props): ReactNode => (
    <AnimatePresence
        initial={false}
        mode="wait"
    >
        <m.span
            key={value === undefined ? "loading" : "loaded"}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {value ?? "–"}
        </m.span>
    </AnimatePresence>
);
