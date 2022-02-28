/** @type {import("next").NextConfig} */
module.exports = {
    reactStrictMode: true,
    headers: async () => [
        {
            source: "/:path*{/}?",
            headers: [
                {
                    key: "Content-Security-Policy",
                    value: "default-src 'self'; connect-src 'self' vitals.vercel-insights.com;"
                }
            ]
        }
    ]
};
