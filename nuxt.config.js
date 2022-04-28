export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'weather-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        rel: 'preconnect',
        crossorigin: true,
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'stylesheet',
        crossorigin: true,
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css',
    '@/styles/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/dayjs.js', mode: 'client' },
    { src: '~/plugins/perfect-scroll.js', mode: 'client' },
    { src: '~/plugins/api.js', mode: 'client' },
    { src: '~/plugins/weatherParser.js', mode: 'client' },
    { src: '~/plugins/directive/temperatureParse.js', mode: 'client' },
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/i18n',
      {
        locales: [
          { code: 'ru', iso: 'ru', file: 'ru' },
          { code: 'uk', iso: 'uk', file: 'uk' },
          { code: 'en', iso: 'en', file: 'en' },
        ],
        langDir: 'locales/',
        seo: false,
        defaultLocale: 'ru',
        lazy: true,
        vuex: {
          syncLocale: true,
        },
      },
    ],
  ],

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    apiKey: process.env.API_KEY,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    https: true,
    baseURL: process.env.BASE_URL,
  },

  server: {
    port: 8000,
    host: '0.0.0.0',
  },

  styleResources: {
    scss: [
      'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css',
      '@/styles/components/imports/*.scss',
      '@/styles/components/*.scss',
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
