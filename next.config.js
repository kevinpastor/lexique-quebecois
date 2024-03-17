// @ts-check
const bundleAnalyzer = require("@next/bundle-analyzer");
const { join } = require("path");

/** @typedef {(nextConfig?: import("next").NextConfig) => import("next").NextConfig} NextPlugin */

/** @type {NextPlugin} */
const withSourceMapAnalyzer = (nextConfig = {}) => ({
    ...nextConfig,
    productionBrowserSourceMaps: true,
})

/** @type {NextPlugin} */
const withBundleAnalyzer = (nextConfig = {}) => (
    bundleAnalyzer()({
        ...nextConfig,
        experimental: {
            ...nextConfig.experimental,
            webpackBuildWorker: true
        }
    })
);

/** @type {NextPlugin} */
const withAnalyze = (nextConfig = {}) => {
    const hasAnalyzeEnvironmentVariable = process.env.ANALYZE === "true";
    if (!hasAnalyzeEnvironmentVariable) {
        return nextConfig;
    }

    return withSourceMapAnalyzer(
        withBundleAnalyzer({
            ...nextConfig,
            eslint: {
                ignoreDuringBuilds: true
            },
            typescript: {
                ignoreBuildErrors: true
            }
        })
    );
};

/** @type {NextPlugin} */
const withProfile = (nextConfig = {}) => {
    const hasProfileEnvironmentVariable = process.env.PROFILE === "true";
    if (!hasProfileEnvironmentVariable) {
        return nextConfig;
    }

    const injectionSource = join(__dirname, "./scripts/why-did-you-render.ts");

    return {
        ...nextConfig,
        webpack: (config, { dev, isServer }) => {
            if (!dev || isServer) {
                return config;
            }

            return {
                ...config,
                entry: async () => {
                    const entries = await config.entry();

                    if (!entries["main-app"] || entries["main-app"].includes(injectionSource)) {
                        return entries;
                    }

                    return {
                        ...entries,
                        ["main-app"]: [
                            injectionSource,
                            ...entries["main-app"]
                        ]
                    };
                }
            };
        }
    };
};

module.exports = withProfile(
    withAnalyze()
);