import { useEffect, useState } from "react";

import { formatDate } from "@utils/misc/date";

export const useFormattedDate = (date: Date): string | undefined => {
    const [formattedDate, setFormattedDate] = useState<string | undefined>(undefined);

    useEffect((): void => {
        setFormattedDate(formatDate(date));
    }, [date]);

    return formattedDate;
};
