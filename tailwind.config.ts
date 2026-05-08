/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Fintech color palette - dark mode primary
        dark: {
          50: '#f7f7f8',
          100: '#eaeaea',
          200: '#d4d4d5',
          300: '#b6b6b7',
          400: '#8e8e8e',
          500: '#6b6b6b',
          600: '#5a5a5a',
          700: '#4a4a4a',
          800: '#3d3d3d',
          900: '#1a1a1a',
          950: '#0a0a0a',
        },
        // Neon accent colors
        neon: {
          blue: '#00d4ff',
          green: '#00ff88',
          purple: '#9d4edd',
          pink: '#ff006e',
          orange: '#ff8c00',
          cyan: '#00ffff',
        },
        // Trading colors
        trading: {
          up: '#00c853',
          down: '#ff5252',
          neutral: '#ffd600',
        },
        // Glassmorphism
        glass: {
          default: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
          hover: 'rgba(255, 255, 255, 0.08)',
        },
      },
      backgroundImage: {
        // Gradients
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.3)',
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'floating': '0 20px 60px -12px rgba(0, 0, 0, 0.5)',
      },
       animation: {
         'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
         'float': 'float 6s ease-in-out infinite',
         'marquee': 'marquee 30s linear infinite',
         'glow': 'glow 2s ease-in-out infinite alternate',
         'shimmer': 'shimmer 2s linear infinite',
         'slide-up': 'slideUp 0.5s ease-out',
         'slide-down': 'slideDown 0.5s ease-out',
         'fade-in': 'fadeIn 0.5s ease-out',
         'scale-in': 'scaleIn 0.3s ease-out',
       },
       keyframes: {
         float: {
           '0%, 100%': { transform: 'translateY(0px)' },
           '50%': { transform: 'translateY(-20px)' },
         },
         marquee: {
           '0%': { transform: 'translateX(0%)' },
           '100%': { transform: 'translateX(-100%)' },
         },
         glow: {
          '0%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      extend: {
        borderRadius: {
          'xl': '1rem',
          '2xl': '1.5rem',
          '3xl': '2rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
