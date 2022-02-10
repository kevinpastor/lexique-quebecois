/** @type {import("next").NextConfig} */
module.exports = {
    reactStrictMode: true,
    rewrites: () => ([
        {
            source: "/api/:path*",
            destination: "http://localhost:8080/api/:path*"
        }
    ])
};
