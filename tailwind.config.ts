import type { Config } from "tailwindcss";


const themeAppColors = {
  50: "#b3e5fc",
  100: "#81d4fa",
  200: "#4fc3f7",
  300: "#29b6f6",
  400: "#03a9f4",
  500: "#0288d1",
  600: "#0277bd",
  700: "#0260a0",
  800: "#024484",
  900: "#022865",
  950: "#011c4c",
}

const themeTextColors = {
  principal: "#334155",
  disabled: "#cbd5e1",
}


const config: Config = {
  mode:"jit",
  content: [
    './node_modules/flowbite-react/**/*.js',
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
    "./node_modules/vComponents/dist/*/.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        sm: '9px',
        ms: '12px',
        base: '13px',
        md: '14px',
        lg: '18px',
        xl: '20px',
        '2xl': '43px',
        '3xl': '1.853rem',
        '4xl': '2.341rem',
        '5xl': '2.952rem',
        '2md': '16px',
        '2lg': '24px',
      },
      fontFamily: {
        acate: ['var(--font-acate)'],
        poppins: ['var(--font-poppins)'],
      },
      variants: {
        filter: ['hover'], // Enable the hover variant for your custom class
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#8600D9',
        secondary: '#FF6600',
        ternary: '#FFD8BD',
        quaternary: '#2E004A',
        quinary: '#4C007A',

        success: '#089C29',
        error: '#E91111',
        alert: '#E91111',
        warning: '#ffd000',

        paraph: '#000000',
        title: '#101010',
        subtitle: '#1B1B1B',
        text: '#000000',
        label: '#034447',
        quote: '#464646',

        background0: '#ffffff',
        background1: '#F1F1F1',
        background2: '#979797',
        background3: '#D9D9D9',

        foreground0: '#000000',
        foreground1: '#363636',
        foreground2: '#666666',

        white: '#ffffff',
        black: '#000000',
        transparent: 'transparent',

        disabled: '#C1C1C1',

        opaque0: '#EAECEE',
        opaque1: '#979797',
        opaque2: '#363636',
        opaque3: '#646464',
        opaque4: '#2C2C2C',
        opaque5: '#838383',
        opaque6: '#dcdcdc',

        purple0: '#4C007A',
        purple1: '#EBCCFF',

        offercolor: '#d70d50',
        bidcolor: '#1ba6d7',
        "theme-text": themeTextColors,
        "theme-app": themeAppColors,
      },
    },
  },
  plugins: [
  require('@tailwindcss/line-clamp'),
  require('flowbite/plugin'),
  ]
};
export default config;
