// @ts-check
const bundleAnalyzer = require("@next/bundle-analyzer");

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

const hasAnalyzeEnvironmentVariable = process.env.ANALYZE === "true";

/** @type {NextPlugin} */
const withAnalyze = (nextConfig = {}) => {
    if (!hasAnalyzeEnvironmentVariable) {
        return nextConfig;
    }

    return withSourceMapAnalyzer(
        withBundleAnalyzer(
            nextConfig
        )
    );
};

module.exports = withAnalyze({
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: hasAnalyzeEnvironmentVariable
    },
    typescript: {
        ignoreBuildErrors: hasAnalyzeEnvironmentVariable
    }
});
