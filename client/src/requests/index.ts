import { isDevelopmentEnvironment } from "@quebecois-urbain/shared/utils/environment";

export const getUrl = (endpoint: string): string => (
    isDevelopmentEnvironment()
        ? `http://localhost:8080${endpoint}`
        : `http://server:8080${endpoint}`
);
