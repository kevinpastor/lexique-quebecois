// @ts-check
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const bundleAnalyzer = require("@next/bundle-analyzer");

/**
 * @param {import("next").NextConfig} nextConfig
 * @param {object} options
 * @param {string | undefined} options.phase PHASE_EXPORT PHASE_PRODUCTION_BUILD PHASE_PRODUCTION_SERVER PHASE_DEVELOPMENT_SERVER PHASE_TEST
 * @param {Array<string> | undefined} options.pageExtensions
 * @returns {import("next").NextConfig}
 */
const withLocalPages = (
    nextConfig = {},
    {
        phase,
        pageExtensions = [
            "tsx",
            "ts",
            "jsx",
            "js"
        ]
    }
) => {
    const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;

    return {
        ...nextConfig,
        pageExtensions: pageExtensions.map((extension) => {
            const prodExtension = `(?<!local\.)${extension}`;
            const devExtension = `local\.${extension}`;
            return isDevServer ? [devExtension, extension] : prodExtension;
        })
            .flat()
    }
};

/**
 * @param {import("next").NextConfig} nextConfig
 * @returns {import("next").NextConfig}
 */
const withSourceMapAnalyzer = (nextConfig = {}) => ({
    ...nextConfig,
    productionBrowserSourceMaps: process.env.ANALYZE_SOURCE_MAP === "true",
})

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE_BUNDLE === "true",
});

/**
 * @param {string} phase PHASE_EXPORT PHASE_PRODUCTION_BUILD PHASE_PRODUCTION_SERVER PHASE_DEVELOPMENT_SERVER PHASE_TEST
 * @param {object} options
 * @param {import("next").NextConfig} options.defaultConfig
 * @returns {import("next").NextConfig}
 */
module.exports = (phase, { defaultConfig }) => (
    withLocalPages(
        withSourceMapAnalyzer(
            withBundleAnalyzer({
                compiler: {
                    styledComponents: true
                }
            })
        ),
        {
            phase,
            pageExtensions: defaultConfig.pageExtensions
        }
    )
);
