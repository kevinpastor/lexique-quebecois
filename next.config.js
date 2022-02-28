/** @type {import("next").NextConfig} */
module.exports = {
    reactStrictMode: true,
    headers: async () => [
        {
            key: "Content-Security-Policy",
            value: "default-src 'self' vitals.vercel-insights.com"
        }
    ]
};
