// https://github.com/vercel/next.js/tree/canary/examples/with-jest-babel
/** @type {import("next/jest").default} */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

/** @type {import("@jest/types/build/Config").GlobalConfig} */
const customJestConfig = {
    collectCoverageFrom: [
        "**/*.ts"
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    },
    moduleNameMapper: {
        "^@/components/(.*)$": "<rootDir>/components/$1",
        "^@/configs/(.*)$": "<rootDir>/configs/$1",
        "^@/models/(.*)$": "<rootDir>/models/$1",
        "^@/services/(.*)$": "<rootDir>/services/$1",
        "^@/utils/(.*)$": "<rootDir>/utils/$1"
    }
};

module.exports = createJestConfig(customJestConfig);
