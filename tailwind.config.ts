import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                ninja: {
                    black: "#1a1a1a",
                    white: "#ffffff",
                    gray: "#2d2d2d",
                    red: "#ff0033",
                    fire: "#ff4500",
                    charcoal: "#121212"
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                ninja: ['var(--font-ninja)', 'cursive'],
                yuji: ['var(--font-yuji)', 'serif'],
            }
        },
    },
    plugins: [],
};
export default config;
