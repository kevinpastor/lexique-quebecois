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
            },
            animation: {
                "fade-in": "fadeIn 150ms ease-in forwards",
                "fade-out": "fadeOut 150ms ease-in forwards",
                "progress-increase": "progressIncrease 2s infinite",
                "progress-decrease": "progressDecrease 2s 0.5s infinite",
            },
            keyframes: {
                "fadeIn": {
                    "0%": {
                        opacity: 0
                    },
                    "100%": {
                        opacity: 1
                    }
                },
                "fadeOut": {
                    "0%": {
                        opacity: 1
                    },
                    "100%": {
                        opacity: 0
                    }
                },
                "progressIncrease": {
                    "from": {
                        left: "-5%",
                        width: "5%"
                    },
                    "to": {
                        left: "130%",
                        width: "100%"
                    }
                },
                "progressDecrease": {
                    "from": {
                        left: "-80%",
                        width: "80%"
                    },
                    "to": {
                        left: "110%",
                        width: "10%"
                    }
                }
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
