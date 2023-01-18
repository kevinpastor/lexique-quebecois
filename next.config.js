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

const defaultPageExtensions = [
    ".tsx",
    ".ts",
    ".jsx",
    ".js"
]

module.exports = withSourceMapAnalyzer(withBundleAnalyzer({
    modularizeImports: {
        // TODO Create regex for @mui/material. `useTheme` is not working.
        // '@mui/material': {
        //     transform: '@mui/material/{{member}}',
        // },
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        }
    },
    reactStrictMode: true,
}));
