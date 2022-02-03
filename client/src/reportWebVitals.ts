import { ReportHandler } from "web-vitals";

export const reportWebVitals = async (onPerfEntry?: ReportHandler): Promise<void> => {
    if (!onPerfEntry || !(onPerfEntry instanceof Function)) {
        return;
    }

    const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import("web-vitals");

    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
};
