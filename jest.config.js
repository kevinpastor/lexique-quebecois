// https://github.com/vercel/next.js/tree/canary/examples/with-jest-babel
const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

const customJestConfig = {
    moduleNameMapper: {
        "^@/components/(.*)$": "<rootDir>/components/$1",
        "^@/configs/(.*)$": "<rootDir>/configs/$1",
        "^@/models/(.*)$": "<rootDir>/models/$1",
        "^@/services/(.*)$": "<rootDir>/services/$1",
        "^@/utils/(.*)$": "<rootDir>/utils/$1"
    }
};

module.exports = createJestConfig(customJestConfig);
