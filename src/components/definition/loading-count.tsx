import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";

interface Props {
    value?: number;
}

export const CrossfadeLoad = ({ value }: Props): ReactElement => (
    <AnimatePresence
        initial={false}
        mode="wait"
    >
        <motion.span
            key={value === undefined ? "loading" : "loaded"}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {value ?? "–"}
        </motion.span>
    </AnimatePresence>
);
