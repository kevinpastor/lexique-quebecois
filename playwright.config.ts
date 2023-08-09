import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

import { isCIEnvironment } from "~/utils/misc/environment";

const getWebServerUrl = (): string => {
    if (isCIEnvironment()) {
        if (!process.env["BASE_URL"]) {
            throw new Error("BASE_URL environment variable is not set.");
        }

        return process.env["BASE_URL"];
    }

    return "http://localhost:3000";
};

const config: PlaywrightTestConfig = {
    fullyParallel: true,
    testDir: "./e2e",
    forbidOnly: isCIEnvironment(),
    reporter: [
        [
            "html",
            {
                outputFolder: "./e2e/report"
            }
        ]
    ],
    retries: isCIEnvironment() ? 1 : 0,
    use: {
        baseURL: getWebServerUrl(),
        video: "retain-on-failure",
        trace: "retain-on-failure"
    },
    outputDir: "./e2e/results/",
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
