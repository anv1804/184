module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "message-layout": "350px 1fr 300px",
        "cline-layout": "250px 1fr 250px",

      },
    },
  },
  plugins: [require("daisyui"),require('tailwind-scrollbar-hide'),],
};
