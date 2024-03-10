export const isUserAgent = (userAgent: RegExp): boolean => (
    typeof navigator !== "undefined" && userAgent.test(navigator.userAgent)
);
