module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./_Client/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [require("tailwind-scrollbar-hide")]
};
