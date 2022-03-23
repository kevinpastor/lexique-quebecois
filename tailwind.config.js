/** @type {import("tailwindcss/tailwind-config").TailwindTheme} */
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        fontFamily: {
            sans: [
                "Open Sans",
                ...defaultTheme.fontFamily.sans
            ],
            serif: [
                "Hahmlet",
                ...defaultTheme.fontFamily.serif
            ]
        },
        extend: {
            saturate: {
                75: ".75"
            },
            brightness: {
                70: ".70"
            }
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px"
        }
    },
    variants: {
        extend: {
            backgroundColor: [
                "even",
                "odd"
            ],
            padding: [
                "first",
                "last"
            ]
        }
    },
    plugins: []
};
