export const isDevelopmentEnvironment = (): boolean => (
    process.env.NODE_ENV === "development"
);

export const isTestEnvironment = (): boolean => (
    process.env.NODE_ENV === "test"
);

export const isCIEnvironment = (): boolean => (
    process.env["CI"] === "true"
);

export const isProductionEnvironment = (): boolean => (
    process.env.NODE_ENV === "production"
);
