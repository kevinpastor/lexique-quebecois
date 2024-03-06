// @ts-check

/**
* @type {import("@stryker-mutator/core/schema/stryker-schema.json")}
*/
module.exports = {
    plugins: [
        "@stryker-mutator/typescript-checker",
        "@stryker-mutator/jest-runner"
    ],
    checkers: [
        "typescript"
    ],
    testRunner: "jest",
    jest: {
        config: {
            testPathIgnorePatterns: [
                "/node_modules/",
                "/e2e/"
            ]
        }
    },
    reporters: [
        "progress",
        "html"
    ],
    incremental: true,
    ignorePatterns: [
        "/.next/",
        "/.swc/",
        "/.vscode/",
        "/coverage/",
        "/e2e/"
    ]
}