/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blueprint: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#0b152d",
        },
        steel: {
          800: "#1e293b",
          850: "#131c2e",
          900: "#0f172a",
          950: "#080c16",
        },
        construction: {
          yellow: "#eab308",
          orange: "#f97316",
          amber: "#f59e0b",
        },
      },
      backgroundImage: {
        "blueprint-grid":
          "radial-gradient(circle, rgba(59, 130, 246, 0.12) 1px, transparent 1px)",
        "blueprint-lines":
          "linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-sm": "16px 16px",
        "grid-md": "24px 24px",
        "grid-lg": "40px 40px",
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
