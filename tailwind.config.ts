import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                mono: ["var(--font-mono)", "monospace"],
            },
            colors: {
                background: "#000000",
                foreground: "#00FF41",
                accent: {
                    NEON_GREEN: "#00FF41",
                    CYBER_CYAN: "#00F3FF",
                    ERROR_RED: "#FF003C",
                    MATRIX_DARK: "#0D0221",
                }
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
