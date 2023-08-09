import { type PropsWithChildren, type ReactElement, createContext, useContext, useEffect, useState } from "react";

import { isAndroid, isIOS, isMacOS, isWindows } from "~/utils/misc/device";

export enum PlatformName {
    iOS = "iOS",
    Android = "Android",
    Windows = "Windows",
    MacOS = "MacOS",
    Unknown = "Unknown"
}

const PlatformNameContext = createContext<PlatformName | undefined>(undefined);

export const usePlatformName = (): PlatformName | undefined => (
    useContext(PlatformNameContext)
);

export const PlatformNameProvider = ({ children }: PropsWithChildren): ReactElement => {
    const [platformName, setPlatformName] = useState<PlatformName | undefined>(undefined);

    useEffect((): void => {
        if (isIOS()) {
            setPlatformName(PlatformName.iOS);
            return;
        }

        if (isAndroid()) {
            setPlatformName(PlatformName.Android);
            return;
        }

        if (isMacOS()) {
            setPlatformName(PlatformName.MacOS);
            return;
        }

        if (isWindows()) {
            setPlatformName(PlatformName.Windows);
            return;
        }

        setPlatformName(PlatformName.Unknown);
    }, []);

    return (
        <PlatformNameContext.Provider value={platformName}>
            {children}
        </PlatformNameContext.Provider>
    );
};