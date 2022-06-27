export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Articles | Maxime Moreillon',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Article management system' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style/article.css',
    '~/assets/style/buttons.css',
    '~/assets/style/common.css',
    '~/assets/style/toolbar.css',
    '~/assets/style/utility.css',
    'vue-material-design-icons/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '~/modules/material-design-icons.js',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    // 'cookie-universal-nuxt',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  server: {
    host: '0', // default: localhost
    port: 8080, // default: 3000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  loading: {
    color: '#c00000',
  },

  

  router: {
    middleware: ['auth', 'pinnedTags']
  },

  serverMiddleware: [
    // '~/server-middleware/auth',
  ],

  publicRuntimeConfig: {
    apiUrl: process.env.NUXT_ENV_CMS_API_URL,
    userManagerApiUrl: process.env.NUXT_ENV_USER_MANAGER_API_URL,
    imageManagerApiUrl: process.env.NUXT_ENV_IMAGE_MANAGER_API_URL,
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'jwt',
          global: true,
          // required: true, // required by default
          // type: 'Bearer' // bearer by default
          maxAge: 1209600 ,
        },
        user: {
          property: false,
          // autoFetch: true // true by default
        },
        endpoints: {
          login: { url: `https://api.users.maximemoreillon.com/v2/auth/login`, method: 'post' },
          user: { url: `https://api.users.maximemoreillon.com/v2/users/self`, method: 'get' },
          logout: false,
        }
      },
    }
  }

}
