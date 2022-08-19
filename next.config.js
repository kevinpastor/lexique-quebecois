// @ts-check
const bundleAnalyzer = require("@next/bundle-analyzer");

/** @typedef {(nextConfig?: import("next").NextConfig) => import("next").NextConfig} NextPlugin */

/** @type {NextPlugin} */
const withSourceMapAnalyzer = (nextConfig = {}) => ({
    ...nextConfig,
    productionBrowserSourceMaps: process.env.ANALYZE_SOURCE_MAP === "true",
})

/** @type {NextPlugin} */
const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE_BUNDLE === "true",
});

module.exports = withSourceMapAnalyzer(withBundleAnalyzer());
