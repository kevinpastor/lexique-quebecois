import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const isCIEnvironment = (): boolean => (
    Boolean(process.env["CI"])
);

const getWebServerUrl = (): string => {
    console.log("UIBHEAIUHBEUIAHBUIHEAUIHBUIH");
    console.log(process.env["CI"]);

    if (isCIEnvironment()) {
        if (!process.env["BASE_URL"]) {
            throw new Error("BASE_URL environment variable is not set.");
        }

        return process.env["BASE_URL"];
    }

    return "http://localhost:3000";
};

const config: PlaywrightTestConfig = {
    testDir: "./tests/e2e",
    forbidOnly: isCIEnvironment(),
    reporter: [
        [
            "html",
            {
                outputFolder: "./tests/e2e/report"
            }
        ]
    ],
    use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
        video: "on-first-retry"
    },
    outputDir: "./tests/e2e/results/",
    webServer: {
        command: "pnpm preview",
        url: getWebServerUrl(),
        reuseExistingServer: true
    },
    projects: [
        {
            name: "Desktop Chromium",
            use: {
                ...devices["Desktop Chrome"]
            }
        },
        {
            name: "Desktop Firefox",
            use: {
                ...devices["Desktop Firefox"]
            }
        },
        {
            name: "Desktop Safari",
            use: {
                ...devices["Desktop Safari"]
            }
        },
        {
            name: "Mobile Chrome",
            use: {
                ...devices["Pixel 5"]
            }
        },
        {
            name: "Mobile Safari",
            use: {
                ...devices["iPhone 12"]
            }
        }
    ]
};

export default config;
