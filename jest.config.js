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
        "/e2e/"
    ],
    moduleNameMapper: {
        "^~\\/(.*)$": "<rootDir>/src/$1"
    },
    collectCoverageFrom: [
        "<rootDir>/src/**/*"
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70
            // lines: 70
            // statements: 70
        }
    },
    coverageDirectory: "<rootDir>/tests/unit/coverage/"
};

module.exports = createJestConfig(customJestConfig);
