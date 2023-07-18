/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/core/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        "realistic-1": "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
        "realistic-2": "rgba(0,0,0,0.08) 0px 4px 12px"
      },
      backgroundImage: {
        "gradient-blue-purple": "linear-gradient(83deg, rgba(59,130,246,1) 0%, rgba(79,70,235,1) 100%)",
        "gradient-metal": "linear-gradient(138deg, rgba(255,255,255,0.7903536414565826) 0%, rgba(240,240,240,0.8855917366946778) 38%, rgba(255,255,255,0.5746673669467788) 67%, rgba(255,255,255,0.9248074229691877) 88%, rgba(244,244,244,0.9360119047619048) 100%)",
        "gradient-trans-sky-blue": "linear-gradient(138deg, rgba(255,255,255,1) 0%, rgba(59,130,246,0.21332282913165268) 100%)"
      },
      keyframes: {
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
          to: { transform: 'translateX(0)' },
        },
        slideOut: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
        slideUpAndFade: {
          'from': { opacity: 0, transform: 'translateY(2px)' },
          'to': { opacity: 1, transform: 'translateY(0)', boxShadow: "0 10px 38px -10px hsla(206,22%,7%,.35), 0 10px 20px -15px hsla(206,22%,7%,.2)" },
        },
        toggleDialog: {
          "from": { opacity: 0, transform: 'scale(1.1) translate(-50%,-50%)' },
          "to": { opacity: 1, transform: 'scale(1) translate(-50%,-50%)' },
        }
      },
      animation: {
        // slideUpAndFade: 'slideUpAndFade 400ms reverse ease-out',
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideOut: 'slideOut 150ms  cubic-bezier(0.16, 1, 0.3, 1) ',
        slideUpAndFade: 'slideUpAndFade 200ms ease-out both',
        openDialog: "toggleDialog 0.25s ease-out both",
        closeDialog: "toggleDialog 0.25s ease-out reverse",

      },
      fontFamily: {
        "noto": ["Noto Sans Thai", "sans-serif"]
      }
    }
  },
  plugins: []
}
