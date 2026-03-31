/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "ui-sans-serif", "system-ui"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular"]
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(239,68,68,0.4)" },
          "50%": { boxShadow: "0 0 0 4px rgba(239,68,68,0)" }
        },
        pulseGreen: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(16,185,129,0.5)" },
          "50%": { boxShadow: "0 0 0 4px rgba(16,185,129,0)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        pulseSoft: "pulseSoft 2s infinite",
        pulseGreen: "pulseGreen 1.5s infinite",
        fadeUp: "fadeUp 0.25s ease"
      }
    }
  },
  plugins: []
};
