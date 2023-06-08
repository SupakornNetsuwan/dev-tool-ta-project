/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/core/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-blue-purple": "linear-gradient(83deg, rgba(59,130,246,1) 0%, rgba(79,70,235,1) 100%)"
      },
      keyframes: {
        slideUpAndFade: {
          'from': { opacity: 0, transform: 'translateY(2px)' },
          'to': { opacity: 1, transform: 'translateY(0)', boxShadow: "0 10px 38px -10px hsla(206,22%,7%,.35), 0 10px 20px -15px hsla(206,22%,7%,.2)" },
        },
      },
      animation: {
        // slideUpAndFade: 'slideUpAndFade 400ms reverse ease-out',
        slideUpAndFade: 'slideUpAndFade 200ms ease-out both',
      },
      fontFamily: {
        "noto": ["Noto Sans Thai", "sans-serif"]
      }
    }
  },
  plugins: []
}
