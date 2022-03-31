import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export const useId = (): string => {
    const [id, setId] = useState("");

    useEffect((): void => {
        setId(uuid());
    }, []);

    return id;
};
