const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD

  const env = {
    ENCRYPT_DEFAULT: 'rdx12PoKedeX-appGrt',
    ENCRYPT_APIKEY: 'rdx12PoKedeX-appGrt',

    BASE_URL_API: (() => {
      if (isDev) return 'https://pokeapi.co/'
      if (isProd) return ' https://pokeapi.co/'
      return ' https://pokeapi.co/'
    })(),
  }

  return {
    env,
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-Content-Options',
              value: 'Deny',
            },
            {
              key: 'Content-Security-Policy',
              value: "frame-ancestors 'none'",
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
          ],
        },
      ]
    },
  }
}

