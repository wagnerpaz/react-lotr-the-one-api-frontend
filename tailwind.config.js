/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hero: "#CC9C01",
        dark: "#000000",
        "dark-900": "#171717",
        "dark-800": "#323949",
        "dark-700": "#3d3e51",
        "dark-600": "#40445a",
        "dark-500": "#4c5265",
        "semi-dark-1": "#373942AA",
        "dark-a11y-high": "#f6f6f6",
        "dark-a11y-medium": "#ececec",
        "dark-a11y-low": "#e1e1e1",
        remove: "#ce1414",
        warning: "#DD6B20",
        error: "#E53E3E",
        info: "#3182CE",
        success: "#38A169",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "ring-bearer": ["RingBearer"],
      },
      spacing: {
        header: "200px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
