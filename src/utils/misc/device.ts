const isUserAgent = (userAgent: RegExp): boolean => (
    typeof navigator !== "undefined" && userAgent.test(navigator.userAgent)
);

export const isIOS = (): boolean => (
    isUserAgent(/iPad|iPhone|iPod/)
);

export const isAndroid = (): boolean => (
    isUserAgent(/Android/)
);

export const isWindows = (): boolean => (
    isUserAgent(/Windows NT/)
);

export const isMacOS = (): boolean => (
    isUserAgent(/Macintosh/)
);

export const isMobile = (): boolean => (
    isIOS() || isAndroid()
);

export const isDesktop = (): boolean => (
    !isMobile()
);

export const isHighEndDevice = (): boolean => (
    isIOS() || isWindows() || isMacOS()
);

export const isLowEndDevice = (): boolean => (
    !isHighEndDevice
);

