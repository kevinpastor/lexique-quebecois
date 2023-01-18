import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testDir: "./tests/e2e",
    forbidOnly: Boolean(process.env["CI"]),
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
        url: "http://127.0.0.1:3000",
        reuseExistingServer: !process.env["CI"]
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
