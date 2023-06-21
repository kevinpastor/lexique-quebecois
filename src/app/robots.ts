import { MetadataRoute } from "next";

export const host: string = "https://lexiquequebecois.com";

const generateRobots = (): MetadataRoute.Robots => ({
    rules: {
        userAgent: "*",
        allow: "/"
    },
    host,
    sitemap: "https://lexiquequebecois.com/sitemap.xml"
});

export default generateRobots;
