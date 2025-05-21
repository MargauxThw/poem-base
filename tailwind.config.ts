import type { Config } from 'tailwindcss';
import 'tw-animate-css';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                border: 'var(--border)',
            },
            animation: {
                'blur-in-out':
                    'blurOut 0.5s ease-in-out forwards, pulse 1s ease-in-out infinite 0.5s',
                'blur-in': 'blurIn 1s ease-in-out forwards',
                'blur-out': 'blurOut 1s ease-in-out forwards',
                pulse: 'pulse 1s ease-in-out infinite',
            },
            keyframes: {
                pulse: {
                    '0%, 100%': { opacity: '0', filter: 'blur(15px)' },
                    '50%': { opacity: '0.5', filter: 'blur(10px)' },
                },
                blurIn: {
                    '0%': { opacity: '0', filter: 'blur(10px)' },
                    '100%': { opacity: '1', filter: 'blur(0)' },
                },
                blurOut: {
                    '0%': { opacity: '1', filter: 'blur(0)' },
                    '100%': { opacity: '0', filter: 'blur(10px)' },
                },
            },
        },
    },
};

export default config;
