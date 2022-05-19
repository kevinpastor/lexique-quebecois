/** @type {import("next").NextConfig} */
const withPWA = require("next-pwa")
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import("next").NextConfig} */
const pwaConfig = withPWA({
    reactStrictMode: true,
    pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === "development",
    }
});

/**
 * 
 * @param {string} phase PHASE_EXPORT PHASE_PRODUCTION_BUILD PHASE_PRODUCTION_SERVER PHASE_DEVELOPMENT_SERVER PHASE_TEST
 * @param {object} options
 * @param {import("next").NextConfig} options.defaultConfig
 * @returns {import("next").NextConfig}
 */
module.exports = (phase, { defaultConfig }) => {
    const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;
    const defaultPageExtensions = defaultConfig.pageExtensions ?? [
        "tsx",
        "ts",
        "jsx",
        "js"
    ];

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        // ...defaultConfig,
        ...pwaConfig,
        pageExtensions: defaultPageExtensions.map((extension) => {
            const prodExtension = `(?<!local\.)${extension}`;
            const devExtension = `local\.${extension}`;
            return isDevServer ? [devExtension, extension] : prodExtension;
        })
            .flat()
    }

    return nextConfig;
}; 
