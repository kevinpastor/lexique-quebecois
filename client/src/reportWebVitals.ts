import { ReportHandler } from "web-vitals";

export const reportWebVitals = (onPerfEntry?: ReportHandler) => {
    if (!onPerfEntry || !(onPerfEntry instanceof Function)) {
        return
    }

    import("web-vitals")
        .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }): void => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
};
