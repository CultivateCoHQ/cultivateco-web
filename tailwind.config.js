/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // CultivateCo brand colors
      colors: {
        // Primary CultivateCo brand palette
        cultivateco: {
          cream: '#fbfaf7',    // Light background, cards, subtle sections
          blue: '#0b447a',     // Professional accents, CTAs, links
          green: '#154438',    // Primary brand color, headers, buttons
          // Generated tints and shades for the brand colors
          'blue-50': '#f0f7ff',
          'blue-100': '#e0efff',
          'blue-200': '#baddff',
          'blue-300': '#7cc3ff',
          'blue-400': '#36a5ff',
          'blue-500': '#0b87ff',
          'blue-600': '#0b447a', // Main brand blue
          'blue-700': '#003d6b',
          'blue-800': '#003356',
          'blue-900': '#002947',
          'green-50': '#f0f9f6',
          'green-100': '#dcf2ea',
          'green-200': '#bce5d6',
          'green-300': '#8dd1ba',
          'green-400': '#5bb89a',
          'green-500': '#369b7d',
          'green-600': '#154438', // Main brand green
          'green-700': '#1a5a47',
          'green-800': '#1b4a3a',
          'green-900': '#1a3d31',
        },
        // UI system colors using brand palette
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: '#154438', // Brand green for focus rings
        background: '#fbfaf7', // Brand cream for backgrounds
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#154438', // Brand green
          foreground: '#fbfaf7', // Brand cream
        },
        secondary: {
          DEFAULT: '#0b447a', // Brand blue
          foreground: '#fbfaf7', // Brand cream
        },
        accent: {
          DEFAULT: '#fbfaf7', // Brand cream
          foreground: '#154438', // Brand green
        },
        muted: {
          DEFAULT: '#f5f4f1', // Slightly darker cream
          foreground: '#6b7280',
        },
        card: {
          DEFAULT: '#fbfaf7', // Brand cream
          foreground: '#1f2937',
        },
      },
      // Cannabis industry typography
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Consolas', 'monospace'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      // Border radius for cannabis UI components
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // Cannabis compliance animations with brand colors
      keyframes: {
        'pulse-cultivateco': {
          '0%, 100%': { backgroundColor: '#154438', opacity: '0.1' },
          '50%': { backgroundColor: '#154438', opacity: '0.2' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-cultivateco': 'pulse-cultivateco 2s infinite',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      // CultivateCo brand shadows
      boxShadow: {
        'cultivateco': '0 4px 6px -1px rgba(21, 68, 56, 0.1), 0 2px 4px -1px rgba(21, 68, 56, 0.06)',
        'cultivateco-lg': '0 10px 15px -3px rgba(21, 68, 56, 0.1), 0 4px 6px -2px rgba(21, 68, 56, 0.05)',
        'cultivateco-blue': '0 4px 6px -1px rgba(11, 68, 122, 0.1), 0 2px 4px -1px rgba(11, 68, 122, 0.06)',
      },
      // CultivateCo brand gradients
      backgroundImage: {
        'cultivateco-gradient': 'linear-gradient(135deg, #154438 0%, #0b447a 100%)',
        'cultivateco-hero': 'linear-gradient(135deg, #fbfaf7 0%, #f5f4f1 100%)',
        'cultivateco-accent': 'linear-gradient(90deg, #154438 0%, #0b447a 50%, #154438 100%)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
