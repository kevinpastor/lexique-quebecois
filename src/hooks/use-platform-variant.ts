import { useEffect, useState } from "react";

import { isAndroid, isIOS } from "~/utils/misc/device";

export const usePlatformVariant = <T>(initialValue: T, ios: T, android: T, desktop: T): T => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (isIOS()) {
            setValue(ios);
        }
        else if (isAndroid()) {
            setValue(android);
        }
        else {
            setValue(desktop);
        }
    }, [ios, android, desktop]);

    return value;
};
