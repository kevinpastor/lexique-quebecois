import { defineWorkspace } from "vitest/config";

// Test files of the form `.client.test.ts` are only tested in the browser.
// Test files of the form `.client.test.ts` are only tested in Node.
// Other test files are tested on both environments.
export default defineWorkspace([
    {
        extends: "./vitest.config.ts",
        test: {
            name: "client",
            exclude: [
                "**/*.server.{test,spec}.{ts,tsx}"
            ],
            browser: {
                enabled: true,
                provider: "playwright",
                name: "chromium"
            }
        }
    },
    {
        extends: "./vitest.config.ts",
        test: {
            name: "server",
            exclude: [
                "**/*.client.{test,spec}.{ts,tsx}"
            ],
            environment: "node"
        }
    }
]);
