/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            colors: {
                // any Tailwind CSS variable overrides you've defined in tailwind.css go here
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                tertiary: {
                    DEFAULT: "hsl(var(--tertiary))",
                    foreground: "hsl(var(--tertiary-foreground))",
                },
                link: {
                    DEFAULT: "hsl(var(--link))",
                },
                background: "hsl(var(--background))",
            },
        },
    },
}