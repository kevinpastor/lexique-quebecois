/** @type {import("next").NextConfig} */
const withPWA = require("next-pwa")
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const pwaConfig = withPWA({
    reactStrictMode: true,
    pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === "development",
    }
});

const getConfig = (phase, { defaultConfig }) => {
    const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;
    
    /** @type {import('next').NextConfig} */
    const nextConfig = {
        // ...defaultConfig,
        ...pwaConfig,
        pageExtensions: [
            "tsx",
            "ts",
            "jsx",
            "js"
        ].map((extension) => {
            const prodExtension = `(?<!local\.)${extension}`;
            const devExtension = `local\.${extension}`;
            return isDevServer ? [devExtension, extension] : prodExtension;
        })
        .flat()
    }
    
    return nextConfig;
}

module.exports = getConfig 
