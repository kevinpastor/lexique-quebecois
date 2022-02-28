/** @type {import("eslint").Linter.BaseConfig} */
module.exports = {
    root: true,
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: [
            "./tsconfig.json"
        ],
        createDefaultProgram: true
    },
    plugins: [
        "@typescript-eslint",
        "promise"
    ],
    extends: [
        "next/core-web-vitals",
        "eslint:recommended",
        "next",
        "plugin:@typescript-eslint/recommended"
    ],
    ignorePatterns: [
        "**/*.js"
    ],
    rules: {
        "react/jsx-indent": [
            "error",
            4
        ],
        "eol-last": "error",
        "eqeqeq": "error",
        "linebreak-style": "off",
        "no-await-in-loop": "error",
        "no-console": "warn",
        "no-trailing-spaces": "error",
        "require-await": "error",
        "promise/always-return": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        "promise/catch-or-return": "error",
        "promise/no-native": "off",
        "promise/no-nesting": "warn",
        "promise/no-promise-in-callback": "warn",
        "promise/no-callback-in-promise": "warn",
        "promise/no-new-statics": "error",
        "promise/no-return-in-finally": "warn",
        "promise/valid-params": "warn",
        // Typescript
        "@typescript-eslint/array-type": [
            "error",
            {
                "default": "generic"
            }
        ],
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/member-delimiter-style": [
            "error"
        ],
        "@typescript-eslint/method-signature-style": "error",
        // "@typescript-eslint/naming-convention": "error",
        "@typescript-eslint/no-confusing-non-null-assertion": "error",
        "@typescript-eslint/no-confusing-void-expression": "error",
        "@typescript-eslint/no-dynamic-delete": "error",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-floating-promises": [
            "error",
            {
                "ignoreIIFE": true
            }
        ],
        "@typescript-eslint/no-implicit-any-catch": "error",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-invalid-void-type": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-unnecessary-qualifier": "error",
        "@typescript-eslint/no-unsafe-argument": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-readonly": "error",
        // "@typescript-eslint/prefer-readonly-parameter-types": "error",
        "@typescript-eslint/typedef": "error",
        // Typescript Extension Rules
        "brace-style": "off",
        "@typescript-eslint/brace-style": [
            "warn",
            "stroustrup",
            {
                "allowSingleLine": true
            }
        ],
        "comma-dangle": "off",
        "@typescript-eslint/comma-dangle": "error",
        "comma-spacing": "off",
        "@typescript-eslint/comma-spacing": "error",
        "default-param-last": "off",
        "@typescript-eslint/default-param-last": "error",
        "dot-notation": "off",
        "@typescript-eslint/dot-notation": "error",
        "func-call-spacing": "off",
        "@typescript-eslint/func-call-spacing": "error",
        "indent": "off",
        "@typescript-eslint/indent": [
            "error",
            4
        ],
        "init-declarations": "off",
        "@typescript-eslint/init-declarations": "error",
        "keyword-spacing": "off",
        "@typescript-eslint/keyword-spacing": "error",
        "lines-between-class-members": "off",
        "@typescript-eslint/lines-between-class-members": "error",
        "no-dupe-class-members": "off",
        "@typescript-eslint/no-dupe-class-members": "error",
        "no-duplicate-imports": "off",
        "@typescript-eslint/no-duplicate-imports": "error",
        // "no-extra-parens": "off",
        // "@typescript-eslint/no-extra-parens": [
        //     "error",
        //     "all",
        //     {
        //         "returnAssign": false,
        //         "ignoreJSX": "all",
        //         "nestedBinaryExpressions": false,
        //         "enforceForArrowConditionals": true
        //     }
        // ]
        "no-invalid-this": "off",
        "@typescript-eslint/no-invalid-this": "error",
        "no-loop-func": "off",
        "@typescript-eslint/no-loop-func": "error",
        "no-loss-of-precision": "off",
        "@typescript-eslint/no-loss-of-precision": "error",
        "no-multiple-empty-lines": [
            "error",
            {
                "max": 1,
                "maxEOF": 1,
                "maxBOF": 0
            }
        ],
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": "error",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": "error",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "error",
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "object-curly-spacing": "off",
        "@typescript-eslint/object-curly-spacing": [
            "error",
            "always"
        ],
        "padded-blocks": [
            "error",
            {
                "blocks": "never",
                "classes": "always",
                "switches": "never"
            }
        ],
        "quotes": "off",
        "@typescript-eslint/quotes": [
            "error",
            "double"
        ],
        "no-return-await": "off",
        "@typescript-eslint/return-await": "error",
        "semi": "off",
        "@typescript-eslint/semi": "error",
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": [
            "error",
            {
                "anonymous": "always",
                "named": "never",
                "asyncArrow": "always"
            }
        ]
    }
}