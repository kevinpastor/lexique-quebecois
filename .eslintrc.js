// @ts-check
const stylistic = require("@stylistic/eslint-plugin");

const { rules: stylisticRules } = stylistic.configs.customize({
    // the following options are the default values
    indent: 4,
    quotes: "double",
    semi: true,
    arrowParens: true,
    commaDangle: "never",
    quoteProps: "as-needed"
});

/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
    root: true,
    plugins: [
        "@typescript-eslint",
        "@stylistic"
    ],
    parserOptions: {
        project: "./tsconfig.json"
    },
    ignorePatterns: ["**/*.js"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:eslint-plugin-react/recommended",
        "plugin:eslint-plugin-react/jsx-runtime",
        "plugin:eslint-plugin-import/recommended",
        "plugin:eslint-plugin-import/typescript",
        "plugin:@next/eslint-plugin-next/recommended",
        "plugin:@next/eslint-plugin-next/core-web-vitals",
        "plugin:eslint-plugin-promise/recommended",
        "plugin:eslint-plugin-jsx-a11y/strict",
        "plugin:eslint-plugin-sonarjs/recommended"
    ],
    settings: {
        react: {
            version: "detect"
        },
        "import/parsers": {
            "@typescript-eslint/parser": [
                ".ts",
                ".tsx"
            ]
        },
        "import/resolver": {
            "typescript": true
        }
    },
    rules: {
        ...stylisticRules,
        "@typescript-eslint/array-type": [
            "error",
            {
                "default": "generic"
            }
        ],
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/non-nullable-type-assertion-style": "off",
        "@typescript-eslint/restrict-template-expressions": [
            "error",
            {
                allowAny: false,
                allowBoolean: false,
                allowNullish: false,
                allowNumber: true,
                allowRegExp: false,
                allowNever: false,
            },
        ],
        "sort-imports": [
            "warn",
            {
                "ignoreDeclarationSort": true
            }
        ],
        "import/order": [
            "warn",
            {
                "groups": [
                    [
                        "builtin",
                        "external"
                    ],
                    "internal",
                    [
                        "sibling",
                        "parent",
                        "index"
                    ]
                ],
                "pathGroups": [
                    {
                        "pattern": "~**",
                        "group": "internal"
                    }
                ],
                "pathGroupsExcludedImportTypes": [],
                "newlines-between": "always",
                "alphabetize": {
                    "order": "asc",
                    "caseInsensitive": true
                },
                "warnOnUnassignedImports": true
            }
        ],
        "jsx-a11y/no-autofocus": "off",
        "sonarjs/no-inverted-boolean-check": "error",
        "sonarjs/no-duplicate-string": "off",
    }
}