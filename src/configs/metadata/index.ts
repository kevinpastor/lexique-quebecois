import { androidMetadata } from "./android-metadata";
import { iosMetadata } from "./ios-metadata";
import { Meta } from "./meta";
import { miscMetadata } from "./misc-metadata";
import { openGraphMetadata } from "./open-graph-metadata";
import { windowsMetadata } from "./windows-metadata";

export const metadata: Array<Meta> = [
    ...openGraphMetadata,
    ...androidMetadata,
    ...iosMetadata,
    ...windowsMetadata,
    ...miscMetadata,
    {
        name: "apple-touch-icon",
        content: "/icons/apple-touch-icon.png"
    },
    {
        name: "description",
        content: "Un peu comme Urban Dictionary, mais québécois."
    },
    {
        name: "keywords",
        content: "lexique québécois, lexique, dictionnaire, traduction, québécois, quebecois, québec, quebec, montréal, montreal, canada, gaspésie, gaspesie, vieux, français, francais, anglais"
    }
];
