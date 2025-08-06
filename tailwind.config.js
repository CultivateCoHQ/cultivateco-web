/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CultivateCo Brand Colors
        brand: {
          cream: '#fbfaf7',
          blue: '#0b447a', 
          green: '#154438',
        },
        // Cannabis Industry Color System
        cannabis: {
          // Primary Brand Colors
          cream: {
            50: '#fefefe',
            100: '#fdfdfc',
            200: '#fbfaf7', // Main brand cream
            300: '#f8f6f0',
            400: '#f4f1e8',
            500: '#efebe0',
            600: '#e8e2d5',
            700: '#ded6c6',
            800: '#d1c7b4',
            900: '#c0b49f',
          },
          blue: {
            50: '#f0f7ff',
            100: '#e0efff',
            200: '#bae0ff',
            300: '#7cc8ff',
            400: '#36adff',
            500: '#0b91ff',
            600: '#0b75d9',
            700: '#0b5db3',
            800: '#0b447a', // Main brand blue
            900: '#0a3a66',
          },
          green: {
            50: '#f0f9f7',
            100: '#dcf2ec',
            200: '#bce5da',
            300: '#8dd1c1',
            400: '#58b5a3',
            500: '#3d9a87',
            600: '#2f7d6e',
            700: '#276659',
            800: '#234f47',
            900: '#154438', // Main brand green
          },
        },
        // Interactive Map Colors
        map: {
          // Cannabis Legal Status Colors
          recreational: '#154438',      // Brand green for recreational legal
          medical: '#0b447a',          // Brand blue for medical only
          illegal: '#fbfaf7',          // Brand cream for illegal
          decriminalized: '#8dd1c1',   // Light green for decriminalized
          pending: '#7cc8ff',          // Light blue for pending
          // Compliance Score Colors
          excellent: '#154438',        // Dark green (90-100)
          good: '#3d9a87',            // Medium green (70-89)
          fair: '#0b447a',            // Brand blue (50-69)
          poor: '#d97706',            // Orange (30-49)
          critical: '#dc2626',        // Red (0-29)
          // Market Readiness Colors
          ready: '#154438',           // Dark green (80-100)
          developing: '#0b447a',      // Brand blue (50-79)
          emerging: '#fbfaf7',        // Cream (0-49)
        },
        // Semantic Colors
        success: '#154438',           // Brand green
        info: '#0b447a',             // Brand blue  
        warning: '#d97706',          // Orange
        error: '#dc2626',            // Red
        neutral: '#fbfaf7',          // Brand cream
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      fontSize: {
        '2xs': '0.625rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem', 
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        // Cannabis-specific animations
        'cannabis-glow': 'cannabisGlow 2s ease-in-out infinite alternate',
        'compliance-pulse': 'compliancePulse 1.5s ease-in-out infinite',
        'map-zoom': 'mapZoom 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        cannabisGlow: {
          '0%': { boxShadow: '0 0 20px rgba(21, 68, 56, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(21, 68, 56, 0.6)' },
        },
        compliancePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        mapZoom: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'cannabis': '0 4px 14px 0 rgba(21, 68, 56, 0.1)',
        'cannabis-lg': '0 10px 25px -3px rgba(21, 68, 56, 0.1), 0 4px 6px -2px rgba(21, 68, 56, 0.05)',
        'cannabis-xl': '0 20px 25px -5px rgba(21, 68, 56, 0.1), 0 10px 10px -5px rgba(21, 68, 56, 0.04)',
        'compliance': '0 4px 14px 0 rgba(11, 68, 122, 0.1)',
        'map-hover': '0 8px 25px 0 rgba(21, 68, 56, 0.15)',
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Custom cannabis industry plugin
    function({ addUtilities }) {
      const newUtilities = {
        '.cannabis-gradient': {
          background: 'linear-gradient(135deg, #154438 0%, #0b447a 100%)',
        },
        '.cannabis-gradient-light': {
          background: 'linear-gradient(135deg, rgba(21, 68, 56, 0.1) 0%, rgba(11, 68, 122, 0.1) 100%)',
        },
        '.text-shadow-cannabis': {
          textShadow: '0 2px 4px rgba(21, 68, 56, 0.3)',
        },
        '.map-state-hover': {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            filter: 'brightness(1.1)',
          },
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
