const sizes = {
  "2px": "2px",
  "22px": "22px",
  "34px": "34px",
  "40px": "40px",
  "42px": "42px",
  "48px": "48px",
  "60px": "60px",
  "80px": "80px",
  "265px": "265px",
  "420px": "420px",
  "748px": "748px",
};

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  important: true,
  darkMode: false,
  theme: {
    extend: {
      spacing: sizes,
      lineHeight: sizes,
      maxWidth: sizes,
      minWidth: sizes,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
