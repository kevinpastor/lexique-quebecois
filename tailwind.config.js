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
                "ui-sans-serif",
                "system-ui",
                "-apple-system",
                "BlinkMacSystemFont",
                "Segoe\\ UI",
                "Roboto",
                "Helvetica\\ Neue",
                "Arial",
                "Noto Sans",
                "sans-serif",
                "Apple\\ Color\\ Emoji",
                "Segoe\\ UI\\ Emoji",
                "Segoe\\ UI\\ Symbol",
                "Noto\\ Color\\ Emoji"
            ],
            serif: [
                "Hahmlet",
                "ui-serif",
                "Georgia",
                "Cambria",
                "Times\\ New\\ Roman",
                "Times",
                "serif"
            ]
        },
        extend: {},
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
