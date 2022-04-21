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
    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/src/utils/tests/"
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80
            // lines: 80
            // statements: 80
        }
    },
    moduleNameMapper: [
        "components",
        "configs",
        "models",
        "services",
        "utils"
    ].reduce((accumulator, value) => ({
        ...accumulator,
        [`^@${value}\\/(.*)$`]: `<rootDir>/src/${value}/$1`
    }), {})
};

module.exports = createJestConfig(customJestConfig);
