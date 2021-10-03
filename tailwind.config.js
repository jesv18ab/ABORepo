module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './utilComponents/**/*.{js,ts,jsx,tsx}'
    ],
    // eslint-disable-next-line sort-keys
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: {
                productImage: "url('/../assets/img/product/billedeCollage.jpg')"
            },
            colors: {
                // accent: '#6D8D3C',
                // secondary: '#72E6E4',
                accent: '#6EC1E4',
                secondary: '#54595F',
                background: '#F1FDFF',
                text: 'rgba(51, 51, 51, 1)',
                bcLogo: '#189ba3',
                cardBg: 'rgb(0, 0, 0, 0.6)'
            },
            height: {
                inherit: 'inherit',
                '9/16': '56.25%',
                available: '-webkit-fill-available',
                74: '18rem'
            },
            borderWidth: {
                1: '1px'
            },
            width: {
                '18/25': '72%'
            },
            margin: {
                '1/3': '33.33%',
                '1/4': '25%',
                '1/10': '10%'
            }
        },
        fontFamily: {
            sans: ['Libre Franklin', 'sans-serif']
        }
    },
    variants: {
        extend: {}
    },
    // eslint-disable-next-line sort-keys
    plugins: [
        function ({ addComponents }) {
            const customComponents = {
                '.landingImg': {
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    margin: '0px',
                    overflow: 'hidden',
                    width: '100vw'
                },
                '.blockChainLogoBg': {
                    display: 'flex',
                    borderWidth: '1rem',
                    borderColor: 'black',
                    opacity: '0.5',
                    borderRadius: '9999px',
                    height: '4rem',
                    width: '4rem',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    alignItems: 'center',
                    margin: '0.5rem'
                },
                '.headlineStyle': {
                    fontFamily: 'Libre Franklin',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    lineHeight: '29px'
                },
                '.shadowText': {
                    filter: 'drop-shadow(10px 10px 10px black)'
                }
            }
            addComponents(customComponents)
        }
    ]
}
