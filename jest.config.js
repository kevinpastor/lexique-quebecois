// https://github.com/vercel/next.js/tree/canary/examples/with-jest-babel
/** @type {import("next/jest").default} */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

/** @type {import("jest").Config} */
const customJestConfig = {
    collectCoverageFrom: [
        "**/*.ts"
    ],
    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/src/utils/tests/",
        "<rootDir>/e2e/",
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70
            // lines: 70
            // statements: 70
        }
    },
    moduleNameMapper: [
        "app",
        "components",
        "models",
        "utils"
    ].reduce((accumulator, value) => ({
        ...accumulator,
        [`^@${value}\\/(.*)$`]: `<rootDir>/src/${value}/$1`
    }), {}),
    testPathIgnorePatterns: [
        "/node_modules/",
        "/e2e/"
    ]
};

module.exports = createJestConfig(customJestConfig);
