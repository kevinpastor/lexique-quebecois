// https://github.com/vercel/next.js/tree/canary/examples/with-jest-babel
/** @type {import("next/jest").default} */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

/** @type {import("jest").Config} */
const customJestConfig = {
    testPathIgnorePatterns: [
        "/node_modules/",
        "/e2e/",
        "/.stryker-tmp/"
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx|mjs)$": [
            "babel-jest",
            {
                presets: [
                    "next/babel"
                ]
            }
        ]
    },
    moduleNameMapper: {
        "^~\\/(.*)$": "<rootDir>/src/$1"
    },
    collectCoverageFrom: [
        "<rootDir>/src/**/*",
        "!<rootDir>/src/**/*.tsx",
        "!<rootDir>/src/**/*.test.ts",
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70
            // lines: 70
            // statements: 70
        }
    }
};

module.exports = createJestConfig(customJestConfig);
