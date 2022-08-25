const isUserAgent = (userAgent: RegExp): boolean => (
    typeof navigator !== "undefined" && userAgent.test(navigator.userAgent)
);

export const isIOS: boolean = isUserAgent(/iPad|iPhone|iPod/);
export const isAndroid: boolean = isUserAgent(/Android/);
export const isWindows: boolean = isUserAgent(/Windows NT/);
export const isMacOS: boolean = isUserAgent(/Macintosh/);
