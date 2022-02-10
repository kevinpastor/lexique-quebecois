module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
        }
    },
    variants: {
        extend: {
            backgroundColor: [
                'even',
                'odd'
            ],
        },
        extend: {
            padding: [
                'first',
                'last'
            ]
        }
    },
    plugins: [],
}