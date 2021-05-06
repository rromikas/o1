const sizes = {
  "34px": "34px",
  "40px": "40px",
  "48px": "48px",
  "60px": "60px",
  "265px": "265px",
};

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      spacing: sizes,
      lineHeight: sizes,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
