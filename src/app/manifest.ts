import { type MetadataRoute } from "next";

import icon192 from "./_images/icon-192.png";
import icon512 from "./_images/icon-512.png";

export const host: string = "https://lexiquequebecois.com";

const generateManifest = (): MetadataRoute.Manifest => ({
    name: "Lexique Québécois",
    theme_color: "#FFF",
    background_color: "#FFF",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    icons: [
        {
            sizes: "192x192",
            type: "image/png",
            src: icon192.src
        },
        {
            sizes: "512x512",
            type: "image/png",
            src: icon512.src
        }
    ]
});

export default generateManifest;
