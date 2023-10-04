// @ts-check
const bundleAnalyzer = require("@next/bundle-analyzer");

/** @typedef {(nextConfig?: import("next").NextConfig) => import("next").NextConfig} NextPlugin */

const hasAnalyzeEnvironmentVariable = process.env.ANALYZE === "true";

/** @type {NextPlugin} */
const withSourceMapAnalyzer = (nextConfig = {}) => ({
    ...nextConfig,
    productionBrowserSourceMaps: hasAnalyzeEnvironmentVariable,
})

/** @type {NextPlugin} */
const withBundleAnalyzer = bundleAnalyzer({
    enabled: hasAnalyzeEnvironmentVariable,
});

module.exports = withSourceMapAnalyzer(withBundleAnalyzer({
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: hasAnalyzeEnvironmentVariable
    },
    typescript: {
        ignoreBuildErrors: hasAnalyzeEnvironmentVariable
    }
}));
