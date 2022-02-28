export const isDevelopmentEnvironment = (): boolean => (
    process.env.NODE_ENV === "development"
);

export const isTestingEnvironment = (): boolean => (
    process.env.NODE_ENV === "test"
);

export const isProductionEnvironment = (): boolean => (
    process.env.NODE_ENV === "production"
);
