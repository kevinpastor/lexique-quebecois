import { useEffect, useState } from "react";

import { formatDate } from "@utils/misc/date";

export const useFormattedTimestamp = (timestamp: number): string | undefined => {
    const [formattedTimestamp, setFormattedTimestamp] = useState<string | undefined>(undefined);
    useEffect((): void => {
        setFormattedTimestamp(formatDate(timestamp));
    }, [timestamp]);

    return formattedTimestamp;
};
