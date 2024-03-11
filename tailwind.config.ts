import type { Config } from "tailwindcss";

const config: Config = {
  mode:"jit",
  content: [
    './node_modules/flowbite-react/**/*.js',
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
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
      },
    },
  },
  plugins: [
  require('@tailwindcss/line-clamp'),
  require('flowbite/plugin')
  ,],
};
export default config;
