/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "nav-pattern": "linear-gradient(135deg, #040D12, #183D3D)",
      },
    },
  },
  plugins: [],
};
