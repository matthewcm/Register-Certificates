module.exports = {
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        safeList: [],
        content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
    },
    theme: {
        extend: {
            fontFamily: {
                'sans': ['FranklinGothic', 'Tahoma', 'Arial', 'sans-serif'],
                'other': ['NeueHaasUnicaPro','Helvetica','Arial','sans-serif'],
            },
            minWidth: {
                '40': '10rem',
                '60': '15rem',
                '80': '20rem',
                '100': '25rem',
            },
            maxWidth: {
                '40': '10rem',
                '80': '20rem',
                '120': '30rem',
                '160': '40rem',
                '200': '50rem',
            },
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                orange: {
                    DEFAULT: '#cf4b0f',
                },
            }

        }
    },
    variants: {},
    plugins: [],
}
