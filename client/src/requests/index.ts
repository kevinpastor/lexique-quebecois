import { isDevelopmentEnvironment } from "@quebecois-urbain/shared/utils/environment";

export const getUrl = (endpoint: string, isSSR: boolean): string => {
    if (!isSSR) {
        return endpoint;
    }

    return (
        isDevelopmentEnvironment()
            ? `http://localhost:8080${endpoint}`
            : `http://server:8080${endpoint}`
    );
};
