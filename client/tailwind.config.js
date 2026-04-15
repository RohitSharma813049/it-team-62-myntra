/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"], // Myntra-like headings
      },

      colors: {
        primary: "#FF3F6C", 
        secondary: "#282C3F", 
        accent: "#14CDA8",
        danger: "#FF5722",
        success: "#03A685",

        bg: "#F5F5F6",
        card: "#FFFFFF",
        muted: "#7E818C",
        border: "#EAEAEC",
      },

      backgroundImage: {
        heroGradient: "linear-gradient(90deg, #FF3F6C, #FF7A18)",
        softGradient: "linear-gradient(180deg, #FFFFFF, #F5F5F6)",
      },

      boxShadow: {
        soft: "0 2px 8px rgba(40, 44, 63, 0.08)",
        card: "0 4px 12px rgba(40, 44, 63, 0.12)",
        hover: "0 8px 24px rgba(40, 44, 63, 0.15)",
        navbar: "0 1px 6px rgba(40, 44, 63, 0.1)",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

        slideUp: {
          "0%": { transform: "translateY(15px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },

        zoomIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },

        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        slideUp: "slideUp 0.4s ease-out",
        zoomIn: "zoomIn 0.3s ease-out",
        shimmer: "shimmer 1.5s infinite linear",
      },
    },
  },
  plugins: [],
};