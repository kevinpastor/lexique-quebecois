import { Fade } from "@mui/material";
import { ReactElement } from "react";

import { useBoolean } from "~/hooks/use-boolean";

interface Props {
    value?: number;
}

export const CrossfadeLoad = ({ value }: Props): ReactElement => {
    const { value: hasLoaded, setTrue: load } = useBoolean(false);

    return (
        <Fade
            in={value === undefined || hasLoaded}
            appear={false}
            onExited={load}
        >
            <span>
                {hasLoaded ? value : "–"}
            </span>
        </Fade>
    );
};
