// @ts-check
/**
 * @type {import("@stryker-mutator/api/core").PartialStrykerOptions}
*/
module.exports = {
    plugins: [
        "@stryker-mutator/typescript-checker",
        "@stryker-mutator/vitest-runner"
    ],
    checkers: [
        "typescript"
    ],
    testRunner: "vitest",
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