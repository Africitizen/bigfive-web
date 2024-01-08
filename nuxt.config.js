export default {
  components: true,
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Africitizen',
    title: 'Plateforme de Tests Psychotechnique de Africitizen',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Évaluez Vos Aptitude à Devenir un acteur de changement en Afrique.' },
      { hid: 'keywords', name: 'keywords', content: 'Psychotechnique, big 5 personality test, b5 test, bigfive test, personality traits, bigfive, compare, free' },
      { hid: 'og:title', name: 'og:title', content: 'Plateforme de Tests Psychotechnique de Africitizen' },
      { hid: 'og:description', name: 'og:description', content: 'Évaluez Vos Aptitude à Devenir un acteur de changement en Afrique.' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:url', name: 'og:url', content: 'https://hypatie.africitizen.co' },
      { hid: 'og:image', name: 'og:image', content: 'https://hypatie.africitizen.co/icon.png' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: 'https://hypatie.africitizen.co' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Plateforme de Tests Psychotechnique de Africitizen' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'Évaluez Vos Aptitude à Devenir un acteur de changement en Afrique.' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://hypatie.africitizen.co/icon.png' },
      { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'Africitizen logo' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: true }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [],
  optimizeCSS: true,
  pwa: {
    manifest: {
      name: 'bigfive',
      short_name: 'b5'
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~/plugins/apexcharts', mode: 'client' },
    { src: '~/plugins/confetti', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    ['@nuxtjs/google-analytics', {
      id: 'UA-92177881-2'
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  optimizedImages: {
    optimizeImages: true
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    'nuxt-webfontloader',
    '@nuxtjs/pwa',
    '@aceforth/nuxt-optimized-images',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js',
            dir: 'ltr'
          },
          {
            name: 'French',
            code: 'fr',
            iso: 'fr',
            file: 'fr.js',
            dir: 'ltr'
          }
        ],
        seo: true,
        baseUrl: 'https://hypatie.africitizen.co',
        defaultLocale: 'fr',
        strategy: 'prefix_except_default',
        lazy: true,
        langDir: 'translations/',
        detectBrowserLanguage: {
          onlyOnRoot: true,
          useCookie: true,
          fallbackLocale: 'en'
        }
      }
    ],
    '@nuxtjs/sitemap',
    [
      'nuxt-amplitude', {
        apiKey: '2ceb7de83dc2b9a3f73bbece2eaf0d94',
        config: {
          saveEvents: true,
          includeUtm: true,
          includeReferrer: true,
          trackingOptions: {
            country: true,
            city: true,
            ip_address: false
          }
        }
      }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  sitemap: {
    hostname: 'https://hypatie.africitizen.co'
  },
  webfontloader: {
    google: {
      families: ['Passion One']
    }
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Krub',
        size: '1.125rem'
      },
      icons: false
    },
    lang: {
      current: 'en'
    },
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#000000',
          secondary: '#ff0080',
          accent: '#607d8b',
          error: '#f44336',
          warning: '#ff9800',
          info: '#03a9f4',
          success: '#7dde76',
          anchor: '#ff0080'
        }
      }
    }
  },
  env: {
    API_URL: 'https://hypatie.africitizen.co/api/' // TODO: Fix for dev environment
  },
  build: {
    extractCSS: true,
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
